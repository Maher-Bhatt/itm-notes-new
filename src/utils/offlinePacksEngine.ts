/**
 * ITM Notes - Offline Subject Packs Engine
 * Saves syllabus notes, formulas, and flashcards into persistent storage
 * for zero-network study during train commutes, hostel outages, or exam mornings.
 */

import { subjects } from "@/data/subjects";
import { MASTER_BANKS } from "@/data/masterBanksRegistry";
import { FORMULAS_DATA } from "@/data/formulasData";
import { toast } from "sonner";

export interface OfflinePackMeta {
  subjectId: string;
  subjectName: string;
  downloadedAt: string;
  sizeKb: number;
  topicsCount: number;
}

const STORAGE_PREFIX = 'itm_offline_pack_';
const PACKS_INDEX_KEY = 'itm_offline_packs_index';

export function getDownloadedPacks(): Record<string, OfflinePackMeta> {
  try {
    const raw = localStorage.getItem(PACKS_INDEX_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function isSubjectDownloaded(subjectId: string): boolean {
  const packs = getDownloadedPacks();
  return Boolean(packs[subjectId]);
}

export async function downloadSubjectOfflinePack(subjectId: string): Promise<OfflinePackMeta> {
  const sub = subjects.find(s => s.id === subjectId || s.code.toLowerCase() === subjectId.toLowerCase());
  const master = MASTER_BANKS[subjectId.toLowerCase()] || null;
  const formulas = FORMULAS_DATA.filter(f => f.subjectCode.toLowerCase() === sub?.code.toLowerCase());

  if (!sub && !master) {
    throw new Error("Subject not found for offline caching.");
  }

  const payload = {
    subject: sub,
    masterBank: master,
    formulas,
    cachedAt: new Date().toISOString(),
  };

  const jsonStr = JSON.stringify(payload);
  const sizeKb = Math.round(new Blob([jsonStr]).size / 1024);

  // Store data bundle
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${subjectId}`, jsonStr);

    const index = getDownloadedPacks();
    const meta: OfflinePackMeta = {
      subjectId,
      subjectName: sub?.name || master?.name || subjectId,
      downloadedAt: new Date().toISOString(),
      sizeKb,
      topicsCount: sub?.units?.reduce((acc, u) => acc + (u.topics?.length || 0), 0) || 38,
    };
    index[subjectId] = meta;
    localStorage.setItem(PACKS_INDEX_KEY, JSON.stringify(index));

    toast.success(`Downloaded ${meta.subjectName} for Offline Study!`, {
      description: `${sizeKb} KB saved. Available without internet.`,
    });
    return meta;
  } catch (e) {
    console.error("Offline storage quota exceeded:", e);
    throw new Error("Local storage quota exceeded. Please clear old packs.");
  }
}

export function removeSubjectOfflinePack(subjectId: string): void {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${subjectId}`);
    const index = getDownloadedPacks();
    delete index[subjectId];
    localStorage.setItem(PACKS_INDEX_KEY, JSON.stringify(index));
    toast.info("Offline pack removed to free space.");
  } catch (e) {
    console.warn("Error removing pack:", e);
  }
}

export function getTotalOfflineStorageUsed(): number {
  const packs = Object.values(getDownloadedPacks());
  return packs.reduce((acc, p) => acc + p.sizeKb, 0);
}
