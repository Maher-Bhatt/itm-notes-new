import React, { useState, useEffect } from 'react';
import {
  Zap,
  Plus,
  Trash2,
  Calendar,
  Clock,
  Sparkles,
  Edit2,
  Check,
  X,
  RefreshCw,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  fetchCampusPulseTiles,
  saveCampusPulseTile,
  deleteCampusPulseTile,
  PulseTileItem,
} from '@/services/campusLoopService';
import { CampusPulseTile, CampusPulseTone } from '@/components/campusloop/CampusPulseTile';

export function AdminPulseTab() {
  const [tiles, setTiles] = useState<PulseTileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTile, setEditingTile] = useState<PulseTileItem | null>(null);

  // Form state
  const [tone, setTone] = useState<CampusPulseTone>('black');
  const [tag, setTag] = useState('LIVE');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [icon, setIcon] = useState<'zap' | 'calendar' | 'clock' | 'sparkles'>('zap');

  const loadTiles = async () => {
    try {
      setLoading(true);
      const data = await fetchCampusPulseTiles();
      setTiles(data);
    } catch {
      toast.error('Failed to load pulse tiles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTiles();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    const tileToSave: PulseTileItem = {
      id: editingTile ? editingTile.id : `pulse-${Date.now()}`,
      tone,
      tag: tag.trim() || 'LIVE',
      title: title.trim(),
      subtitle: subtitle.trim() || undefined,
      icon,
      isActive: true,
    };

    await saveCampusPulseTile(tileToSave);
    toast.success(editingTile ? 'Pulse tile updated!' : 'New pulse tile live on campus feed!');
    setEditingTile(null);
    setTitle('');
    setSubtitle('');
    setTag('LIVE');
    setTone('black');
    loadTiles();
  };

  const handleStartEdit = (tile: PulseTileItem) => {
    setEditingTile(tile);
    setTone(tile.tone);
    setTag(tile.tag);
    setTitle(tile.title);
    setSubtitle(tile.subtitle || '');
    setIcon(tile.icon || 'zap');
  };

  const handleDelete = async (tileId: string) => {
    if (!confirm('Are you sure you want to remove this live pulse tile?')) return;
    await deleteCampusPulseTile(tileId);
    toast.success('Pulse tile removed.');
    loadTiles();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-[22px] bg-white dark:bg-[#18181B] border border-[#E8E4DA] dark:border-neutral-800 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-[#111111] dark:text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#2B4EFF]" />
            Campus Pulse Live Controller
          </h2>
          <p className="text-xs text-[#6B7280] dark:text-neutral-400 mt-1">
            Real-time feed cards for library occupancy, placement talks, and semester deadlines.
          </p>
        </div>

        <button
          type="button"
          onClick={loadTiles}
          className="h-9 px-3.5 rounded-full bg-[#F6F3EC] dark:bg-neutral-800 text-xs font-semibold flex items-center gap-1.5 hover:bg-neutral-200"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Live Preview & Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Creator / Editor Form (6 cols) */}
        <div className="lg:col-span-6 rounded-[22px] bg-white dark:bg-[#18181B] border border-[#E8E4DA] dark:border-neutral-800 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EFECE6] dark:border-neutral-800">
            <h3 className="font-bold text-sm text-[#111111] dark:text-white">
              {editingTile ? 'Edit Pulse Tile' : 'Create New Pulse Tile'}
            </h3>
            {editingTile && (
              <button
                type="button"
                onClick={() => {
                  setEditingTile(null);
                  setTitle('');
                  setSubtitle('');
                }}
                className="text-xs text-rose-500 font-semibold"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-3.5">
            {/* Tone Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                Tile Tone
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['black', 'lime', 'blue', 'white'] as CampusPulseTone[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTone(t)}
                    className={`h-9 rounded-xl text-xs font-bold capitalize border transition-all cursor-pointer ${
                      tone === t
                        ? 'border-[#2B4EFF] ring-2 ring-[#2B4EFF]/20 font-black'
                        : 'border-[#E8E4DA]'
                    } ${
                      t === 'black'
                        ? 'bg-[#111111] text-white'
                        : t === 'lime'
                        ? 'bg-[#D7F75B] text-[#111111]'
                        : t === 'blue'
                        ? 'bg-[#2B4EFF] text-white'
                        : 'bg-white text-[#111111]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Tag & Icon */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  Tag Text
                </label>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="e.g. LIVE, TODAY 4 PM, DEADLINE"
                  className="w-full h-10 px-3.5 rounded-xl bg-[#F6F3EC] dark:bg-neutral-800 text-xs font-medium border border-[#E8E4DA]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  Icon
                </label>
                <select
                  value={icon}
                  onChange={(e) => setIcon(e.target.value as any)}
                  className="w-full h-10 px-3.5 rounded-xl bg-[#F6F3EC] dark:bg-neutral-800 text-xs font-medium border border-[#E8E4DA]"
                >
                  <option value="zap">⚡ Lightning (Zap)</option>
                  <option value="calendar">📅 Calendar</option>
                  <option value="clock">⏰ Clock</option>
                  <option value="sparkles">✨ Sparkles</option>
                </select>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                Headline / Status
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Central Library is open with 14 seats on 2nd floor"
                className="w-full h-10 px-3.5 rounded-xl bg-[#F6F3EC] dark:bg-neutral-800 text-xs font-medium border border-[#E8E4DA]"
                required
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                Subtext / Details (Optional)
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. Wi-Fi verified active. Power plugs available."
                className="w-full h-10 px-3.5 rounded-xl bg-[#F6F3EC] dark:bg-neutral-800 text-xs font-medium border border-[#E8E4DA]"
              />
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-full bg-[#2B4EFF] hover:bg-[#1E3EDB] text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{editingTile ? 'Update Pulse Tile' : 'Publish Live Pulse Tile'}</span>
            </button>
          </form>
        </div>

        {/* Live Preview (6 cols) */}
        <div className="lg:col-span-6 rounded-[22px] bg-white dark:bg-[#18181B] border border-[#E8E4DA] dark:border-neutral-800 p-5 sm:p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-[#111111] dark:text-white pb-3 border-b border-[#EFECE6] dark:border-neutral-800">
            Preview of Current Card
          </h3>

          <div className="py-4 flex justify-center">
            <CampusPulseTile
              tone={tone}
              tag={tag || 'LIVE'}
              title={title || 'Central Library is open until 9:00 PM'}
              subtitle={subtitle || 'Reference room seats and charging stations open'}
              icon={icon}
            />
          </div>
        </div>
      </div>

      {/* Active Tiles Table */}
      <div className="rounded-[22px] bg-white dark:bg-[#18181B] border border-[#E8E4DA] dark:border-neutral-800 p-5 shadow-xs">
        <h3 className="font-bold text-sm text-[#111111] dark:text-white mb-3">
          Currently Live Pulse Tiles ({tiles.length})
        </h3>

        <div className="space-y-2.5">
          {tiles.map((tile) => (
            <div
              key={tile.id}
              className="p-3.5 rounded-2xl bg-[#F6F3EC] dark:bg-neutral-900 border border-[#E8E4DA] flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800">
                    {tile.tag}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-neutral-400">
                    Tone: {tile.tone}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-[#111111] dark:text-white truncate">
                  {tile.title}
                </h4>
                {tile.subtitle && (
                  <p className="text-xs text-[#6B7280] dark:text-neutral-400 truncate">
                    {tile.subtitle}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleStartEdit(tile)}
                  className="p-2 rounded-xl bg-white dark:bg-neutral-800 hover:text-[#2B4EFF]"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(tile.id)}
                  className="p-2 rounded-xl bg-white dark:bg-neutral-800 hover:text-rose-600"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
