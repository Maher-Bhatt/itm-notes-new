import { useState, useMemo } from "react";
import {
  Search,
  RefreshCw,
  Download,
  ChevronLeft,
  ChevronRight,
  Shield,
  Ban,
  CheckCircle,
  Eye,
  X,
  Filter,
  ArrowUpDown,
  UserX,
} from "lucide-react";
import { UserAvatar } from "@/components/UserAvatar";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { logAdminAction } from "@/services/adminOperationsService";

export interface AdminUser {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: string;
  xp: number;
  joined: string;
  avatarUrl?: string;
  is_suspended?: boolean;
  semester?: number;
  branch?: string;
  streak?: number;
}

interface AdminUsersTabProps {
  users: AdminUser[];
  loading: boolean;
  onRefresh: () => void;
  onRoleChange: (profileId: string, userId: string, newRole: string) => Promise<void>;
  exportUsersCSV: () => void;
}

export function AdminUsersTab({
  users,
  loading,
  onRefresh,
  onRoleChange,
  exportUsersCSV,
}: AdminUsersTabProps) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"xp_desc" | "joined_desc" | "name_asc">("xp_desc");
  const [page, setPage] = useState(1);
  const pageSize = 12;

  // Selected user for Detail Drawer
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  // Bulk selection state
  const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(new Set());
  const [bulkRole, setBulkRole] = useState<string>("student");
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);

  // Filter & sort
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q);

      const matchesRole = roleFilter === "all" || u.role === roleFilter;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "suspended" ? !!u.is_suspended : !u.is_suspended);

      return matchesSearch && matchesRole && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === "xp_desc") return b.xp - a.xp;
      if (sortBy === "joined_desc") return new Date(b.joined).getTime() - new Date(a.joined).getTime();
      if (sortBy === "name_asc") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [users, search, roleFilter, statusFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const pagedUsers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, page, pageSize]);

  // Handle Suspend/Unsuspend
  const handleToggleSuspend = async (u: AdminUser) => {
    const nextState = !u.is_suspended;
    try {
      let updateError = null;
      const { error: err1 } = await supabase
        .from("profiles")
        .update({ is_suspended: nextState } as any)
        .eq("id", u.id);

      if (err1) {
        // Fallback to status column if is_suspended column is not yet migrated in database
        const { error: err2 } = await supabase
          .from("profiles")
          .update({ status: nextState ? "Suspended" : "Active" } as any)
          .eq("id", u.id);
        if (err2) {
          updateError = err1;
        }
      }

      if (updateError) throw updateError;

      u.is_suspended = nextState;
      toast.success(
        nextState
          ? `User ${u.name} has been suspended.`
          : `User ${u.name} has been reinstated.`
      );

      await logAdminAction(
        nextState ? "USER_SUSPEND" : "USER_UNSUSPEND",
        "user_profile",
        u.id,
        { email: u.email, is_suspended: nextState }
      );

      if (selectedUser?.id === u.id) {
        setSelectedUser({ ...u, is_suspended: nextState });
      }
      onRefresh();
    } catch (err: any) {
      toast.error(`Action failed: ${err.message || "Could not update status"}`);
    }
  };

  // Bulk role update
  const handleBulkRoleApply = async () => {
    if (selectedUserIds.size === 0) return;
    setIsBulkProcessing(true);
    let successCount = 0;

    for (const userId of Array.from(selectedUserIds)) {
      const targetUser = users.find((u) => u.userId === userId || u.id === userId);
      if (targetUser) {
        try {
          await onRoleChange(targetUser.id, targetUser.userId, bulkRole);
          successCount++;
        } catch {}
      }
    }

    setIsBulkProcessing(false);
    setSelectedUserIds(new Set());
    toast.success(`Updated role to ${bulkRole} for ${successCount} users.`);
    onRefresh();
  };

  const toggleSelectAll = () => {
    if (selectedUserIds.size === pagedUsers.length) {
      setSelectedUserIds(new Set());
    } else {
      setSelectedUserIds(new Set(pagedUsers.map((u) => u.userId)));
    }
  };

  const toggleSelectUser = (userId: string) => {
    setSelectedUserIds((prev) => {
      const next = new Set(prev);
      if (next.has(userId)) next.delete(userId);
      else next.add(userId);
      return next;
    });
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* 1. Header controls */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by student name or email…"
              className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D6E85D]/60"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onRefresh}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-700 transition-colors"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden xs:inline">Refresh</span>
            </button>
            <button
              onClick={exportUsersCSV}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#D6E85D]/10 border border-[#D6E85D]/30 rounded-xl text-xs font-semibold text-[#D6E85D] hover:bg-[#D6E85D]/20 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* 2. Filters & Sort toolbar */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/80 px-2.5 py-1.5 rounded-lg">
            <Filter className="h-3 w-3 text-slate-400" />
            <span className="font-medium text-[11px] text-slate-400">Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setPage(1);
              }}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-800">All Roles</option>
              <option value="student" className="bg-slate-800">Student</option>
              <option value="admin" className="bg-slate-800">Admin</option>
              <option value="guest" className="bg-slate-800">Guest</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/80 px-2.5 py-1.5 rounded-lg">
            <Shield className="h-3 w-3 text-slate-400" />
            <span className="font-medium text-[11px] text-slate-400">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-800">All Status</option>
              <option value="active" className="bg-slate-800">Active</option>
              <option value="suspended" className="bg-slate-800">Suspended</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/80 px-2.5 py-1.5 rounded-lg">
            <ArrowUpDown className="h-3 w-3 text-slate-400" />
            <span className="font-medium text-[11px] text-slate-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="xp_desc" className="bg-slate-800">Highest XP</option>
              <option value="joined_desc" className="bg-slate-800">Recently Joined</option>
              <option value="name_asc" className="bg-slate-800">Name (A-Z)</option>
            </select>
          </div>

          {/* Bulk actions bar if items are selected */}
          {selectedUserIds.size > 0 && (
            <div className="flex items-center gap-2 ml-auto bg-[#D6E85D]/10 border border-[#D6E85D]/30 px-3 py-1 rounded-lg">
              <span className="text-[11px] font-bold text-[#D6E85D]">
                {selectedUserIds.size} selected
              </span>
              <select
                value={bulkRole}
                onChange={(e) => setBulkRole(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-white rounded px-2 py-0.5 text-[11px]"
              >
                <option value="student">Set to Student</option>
                <option value="admin">Set to Admin</option>
                <option value="guest">Set to Guest</option>
              </select>
              <button
                onClick={handleBulkRoleApply}
                disabled={isBulkProcessing}
                className="px-2.5 py-0.5 bg-[#D6E85D] hover:bg-[#c8dc4e] text-[#183F36] rounded font-bold text-[11px] transition-colors"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. Main User List: Mobile Stacked Cards (block lg:hidden) */}
      <div className="block lg:hidden space-y-3">
        {loading ? (
          <div className="py-12 text-center text-slate-500 text-sm">Loading user directory…</div>
        ) : pagedUsers.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-sm bg-slate-800 border border-slate-700 rounded-2xl">
            No users match your criteria.
          </div>
        ) : (
          pagedUsers.map((u) => {
            const isSelected = selectedUserIds.has(u.userId);
            return (
              <div
                key={u.id}
                className={`bg-slate-800 border rounded-2xl p-4 transition-all shadow-sm ${
                  u.is_suspended
                    ? "border-red-500/40 bg-red-950/10"
                    : isSelected
                    ? "border-[#D6E85D]/60 bg-slate-800/90"
                    : "border-slate-700"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectUser(u.userId)}
                      className="rounded border-slate-600 text-[#D6E85D] focus:ring-0 shrink-0"
                    />
                    <UserAvatar
                      avatarUrl={u.avatarUrl}
                      displayName={u.name}
                      email={u.email}
                      className="h-10 w-10 text-xs shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="font-bold text-white text-sm truncate">{u.name}</p>
                        {u.is_suspended && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30">
                            Suspended
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono truncate">{u.email}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedUser(u)}
                    className="p-1.5 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0"
                    title="View user details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-700/60 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Role</span>
                    <select
                      value={u.role}
                      onChange={(e) => onRoleChange(u.id, u.userId, e.target.value)}
                      className="mt-0.5 w-full bg-slate-700 border border-slate-600 rounded-lg text-xs text-slate-200 px-2 py-1 focus:outline-none focus:border-[#D6E85D]/60"
                    >
                      <option value="student">Student</option>
                      <option value="admin">Admin</option>
                      <option value="guest">Guest</option>
                    </select>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Total XP</span>
                    <span className="mt-0.5 inline-block font-mono font-bold text-amber-400">
                      ⚡ {u.xp.toLocaleString()} XP
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-700/40">
                  <span className="text-[11px] text-slate-500">Joined: {u.joined}</span>
                  <button
                    onClick={() => handleToggleSuspend(u)}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-colors ${
                      u.is_suspended
                        ? "bg-amber-500/10 text-amber-500 border-amber-500/30 hover:bg-amber-500/20"
                        : "bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20"
                    }`}
                  >
                    {u.is_suspended ? "Unsuspend" : "Suspend Account"}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 4. Desktop Table View (hidden lg:block) with styled scrollbar */}
      <div className="hidden lg:block bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-slate-500">Loading users…</div>
        ) : (
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-700/60 text-slate-400 uppercase text-[11px] font-bold border-b border-slate-700">
                <tr>
                  <th className="px-4 py-3 w-10">
                    <input
                      type="checkbox"
                      checked={pagedUsers.length > 0 && selectedUserIds.size === pagedUsers.length}
                      onChange={toggleSelectAll}
                      className="rounded border-slate-600 text-[#D6E85D] focus:ring-0"
                    />
                  </th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">XP</th>
                  <th className="px-4 py-3">Joined</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {pagedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-500">
                      No users match your criteria.
                    </td>
                  </tr>
                ) : (
                  pagedUsers.map((u) => {
                    const isSelected = selectedUserIds.has(u.userId);
                    return (
                      <tr
                        key={u.id}
                        className={`hover:bg-slate-700/30 transition-colors ${
                          isSelected ? "bg-slate-700/20" : ""
                        }`}
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectUser(u.userId)}
                            className="rounded border-slate-600 text-[#D6E85D] focus:ring-0"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <UserAvatar
                              avatarUrl={u.avatarUrl}
                              displayName={u.name}
                              email={u.email}
                              className="h-8 w-8 text-xs shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="font-semibold text-white truncate block">{u.name}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-400 font-mono text-xs">{u.email}</td>
                        <td className="px-4 py-3">
                          <select
                            value={u.role}
                            onChange={(e) => onRoleChange(u.id, u.userId, e.target.value)}
                            className="bg-slate-700 border border-slate-600 rounded-lg text-xs text-slate-200 px-2 py-1 focus:outline-none focus:border-[#D6E85D]/60 cursor-pointer"
                          >
                            <option value="student">Student</option>
                            <option value="admin">Admin</option>
                            <option value="guest">Guest</option>
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          {u.is_suspended ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30">
                              Suspended
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/30">
                              Active
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-amber-400 font-mono text-xs font-bold">
                          ⚡ {u.xp.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-slate-400 text-xs">{u.joined}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedUser(u)}
                              className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                              title="View details"
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleToggleSuspend(u)}
                              className={`p-1.5 rounded-lg border transition-colors ${
                                u.is_suspended
                                  ? "bg-amber-500/10 text-amber-500 border-amber-500/30 hover:bg-amber-500/20"
                                  : "bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20"
                              }`}
                              title={u.is_suspended ? "Unsuspend account" : "Suspend account"}
                            >
                              {u.is_suspended ? (
                                <CheckCircle className="h-3.5 w-3.5" />
                              ) : (
                                <Ban className="h-3.5 w-3.5" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 5. Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
          <p>
            {filteredUsers.length} users &middot; Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 disabled:opacity-40 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* 6. User Detail Drawer Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl w-full max-w-md p-6 space-y-5 shadow-2xl relative animate-scale-in">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute right-4 top-4 p-1.5 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3">
              <UserAvatar
                avatarUrl={selectedUser.avatarUrl}
                displayName={selectedUser.name}
                email={selectedUser.email}
                className="h-14 w-14 text-base"
              />
              <div className="min-w-0">
                <h3 className="text-base font-bold text-white truncate">{selectedUser.name}</h3>
                <p className="text-xs text-slate-400 font-mono truncate">{selectedUser.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D6E85D]/10 text-[#D6E85D] border border-[#D6E85D]/30 uppercase">
                    {selectedUser.role}
                  </span>
                  {selectedUser.is_suspended && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 uppercase">
                      Suspended
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-900/60 p-4 rounded-2xl border border-slate-700/60">
              <div>
                <span className="text-slate-400 text-[10px] block uppercase font-medium">Semester</span>
                <span className="text-white font-bold text-sm">
                  {selectedUser.semester ? `Semester ${selectedUser.semester}` : "Sem 3 (Default)"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block uppercase font-medium">Branch</span>
                <span className="text-white font-bold text-sm truncate block">
                  {selectedUser.branch || "Computer Science (CSE)"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block uppercase font-medium">Experience XP</span>
                <span className="text-amber-400 font-mono font-bold text-sm">
                  ⚡ {selectedUser.xp.toLocaleString()} XP
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block uppercase font-medium">Study Streak</span>
                <span className="text-orange-400 font-mono font-bold text-sm">
                  🔥 {selectedUser.streak || 1} Days
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Manage Access
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleToggleSuspend(selectedUser)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 ${
                    selectedUser.is_suspended
                      ? "bg-amber-500/10 text-amber-500 border-amber-500/30 hover:bg-amber-500/20"
                      : "bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20"
                  }`}
                >
                  {selectedUser.is_suspended ? (
                    <>
                      <CheckCircle className="h-3.5 w-3.5" />
                      <span>Reactivate Account</span>
                    </>
                  ) : (
                    <>
                      <UserX className="h-3.5 w-3.5" />
                      <span>Suspend Student Access</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
