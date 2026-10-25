/**
 * ITM Notes - In-Reader Highlights & Personal Annotations
 * Allows students to highlight text ranges in topic markdown
 * and attach sticky notes (e.g., "Asked in MST-2").
 */

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

export interface AnnotationItem {
  id: string;
  topicId: string;
  selectedText: string;
  noteText?: string;
  color: 'yellow' | 'green' | 'blue' | 'pink';
  createdAt: string;
}

export function useAnnotations(topicId: string | undefined) {
  const storageKey = `itm_annotations_${topicId || 'global'}`;

  const [annotations, setAnnotations] = useState<AnnotationItem[]>(() => {
    if (!topicId) return [];
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (!topicId) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(annotations));
    } catch (e) {
      console.warn("Failed to persist annotations:", e);
    }
  }, [annotations, storageKey, topicId]);

  const addAnnotation = useCallback((selectedText: string, color: AnnotationItem['color'] = 'yellow', noteText?: string) => {
    if (!selectedText.trim() || !topicId) return;

    const newItem: AnnotationItem = {
      id: `annot-${Date.now()}`,
      topicId,
      selectedText: selectedText.trim(),
      noteText: noteText?.trim(),
      color,
      createdAt: new Date().toISOString(),
    };

    setAnnotations((prev) => [newItem, ...prev]);
    toast.success("Highlight saved to personal notes!");
  }, [topicId]);

  const removeAnnotation = useCallback((id: string) => {
    setAnnotations((prev) => prev.filter((a) => a.id !== id));
    toast.info("Annotation removed");
  }, []);

  const updateNote = useCallback((id: string, noteText: string) => {
    setAnnotations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, noteText: noteText.trim() } : a))
    );
    toast.success("Note updated");
  }, []);

  return {
    annotations,
    addAnnotation,
    removeAnnotation,
    updateNote,
  };
}
