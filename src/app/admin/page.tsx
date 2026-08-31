"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  getLeads, updateLead, deleteLead, exportLeadsCSV, getLeadStats, formatCurrency, parseBudget,
  type Lead, type LeadStatus, type LeadSource
} from "@/lib/leads";
import { getUserEmail, logout } from "@/lib/auth";
import {
  Users, TrendingUp, Download, Trash2, Edit2, Save, X, Search, DollarSign, BarChart3,
  Phone, Sparkles, Calculator, FileText, Eye, ChevronRight, LogOut, Settings, ArrowLeft
} from "lucide-react";

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  contacted: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  confirmed: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  declined: "text-red-400 bg-red-400/10 border-red-400/20",
  done: "text-zinc-400 bg-zinc-400/10 border-zinc-400/20",
};

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  confirmed: "Confirmed",
  declined: "Declined",
  done: "Done",
};

interface SourceTab {
  id: LeadSource | "all";
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}

const SOURCE_TABS: SourceTab[] = [
  { id: "all", label: "All Leads", icon: Users, color: "text-white" },
  { id: "call", label: "Call Bookings", icon: Phone, color: "text-emerald-400" },
  { id: "audit", label: "Free Audits", icon: Sparkles, color: "text-emerald-400" },
  { id: "quotation", label: "Quotations", icon: Calculator, color: "text-blue-400" },
  { id: "demo", label: "Demo Requests", icon: FileText, color: "text-purple-400" },
  { id: "contact", label: "Other", icon: Users, color: "text-zinc-400" },
];

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<LeadSource | "all">("all");
  const [filterStatus, setFilterStatus] = useState<LeadStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Lead>>({});
  const [viewingLead, setViewingLead] = useState<Lead | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [username, setUsername] = useState("admin");
  const navigate = useRouter();

  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        const [email, fetchedLeads] = await Promise.all([
          getUserEmail(),
          getLeads()
        ]);
        if (email) {
          setUsername(email);
        }
        setLeads(fetchedLeads);
      } catch (err) {
        console.error("Failed to load initial admin dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadInitialData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate.replace("/admin/login");
  };

  // Close user menu when clicking outside
  useEffect(() => {
    if (!userMenuOpen) return;
    const handleClick = () => setUserMenuOpen(false);
    setTimeout(() => document.addEventListener("click", handleClick), 0);
    return () => document.removeEventListener("click", handleClick);
  }, [userMenuOpen]);

  const stats = useMemo(() => getLeadStats(leads), [leads]);

  // Count leads per source
  const sourceCounts = useMemo(() => {
    const counts: Record<string, number> = { all: leads.length };
    leads.forEach((lead) => {
      counts[lead.source] = (counts[lead.source] || 0) + 1;
    });
    return counts;
  }, [leads]);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesTab = activeTab === "all" || lead.source === activeTab;
      const matchesStatus = filterStatus === "all" || lead.status === filterStatus;
      const matchesSearch = !search ||
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase()) ||
        lead.company?.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone?.toLowerCase().includes(search.toLowerCase());
      return matchesTab && matchesStatus && matchesSearch;
    });
  }, [leads, activeTab, filterStatus, search]);

  const [analyticsOpen, setAnalyticsOpen] = useState(true);

  // Pipeline stage stats grouped by status
  const pipelineStages = useMemo(() => {
    const stages: Record<LeadStatus, { count: number; value: number }> = {
      new: { count: 0, value: 0 },
      contacted: { count: 0, value: 0 },
      confirmed: { count: 0, value: 0 },
      done: { count: 0, value: 0 },
      declined: { count: 0, value: 0 },
    };
    leads.forEach((lead) => {
      const status = lead.status;
      if (stages[status]) {
        stages[status].count += 1;
        stages[status].value += parseBudget(lead.budget || "");
      }
    });
    return stages;
  }, [leads]);

  // Cumulative Conversion Funnel data
  const funnelData = useMemo(() => {
    const cumulative = [
      { label: "New Leads", count: leads.filter(l => l.status !== "declined").length },
      { label: "In Contact", count: leads.filter(l => ["contacted", "confirmed", "done"].includes(l.status)).length },
      { label: "Confirmed", count: leads.filter(l => ["confirmed", "done"].includes(l.status)).length },
      { label: "Closed Won", count: leads.filter(l => l.status === "done").length }
    ];
    const maxCount = cumulative[0].count || 1;
    return cumulative.map((stage) => ({
      ...stage,
      percentage: Math.round((stage.count / maxCount) * 100)
    }));
  }, [leads]);

  // Last 7 days daily activities
  const chartData = useMemo(() => {
    const dates = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().slice(0, 10);
    });

    const counts: Record<string, number> = {};
    const values: Record<string, number> = {};

    dates.forEach((date) => {
      counts[date] = 0;
      values[date] = 0;
    });

    leads.forEach((lead) => {
      const date = lead.createdAt.slice(0, 10);
      if (counts[date] !== undefined) {
        counts[date] += 1;
        values[date] += parseBudget(lead.budget || "");
      }
    });

    return dates.map((date) => {
      const formattedDate = new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      return {
        date: formattedDate,
        leads: counts[date] || 0,
        value: values[date] || 0,
      };
    });
  }, [leads]);

  const handleStatusChange = async (id: string, status: LeadStatus) => {
    try {
      const updated = await updateLead(id, { status });
      if (updated) {
        const freshLeads = await getLeads();
        setLeads(freshLeads);
        if (viewingLead?.id === id) {
          setViewingLead({ ...viewingLead, status });
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleEdit = (lead: Lead) => {
    setEditingId(lead.id);
    setEditData({ budget: lead.budget, notes: lead.notes });
  };

  const handleSave = async (id: string) => {
    try {
      await updateLead(id, editData);
      const freshLeads = await getLeads();
      setLeads(freshLeads);
      setEditingId(null);
      setEditData({});
    } catch (err) {
      console.error("Failed to save lead updates:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this lead permanently?")) {
      try {
        await deleteLead(id);
        const freshLeads = await getLeads();
        setLeads(freshLeads);
        if (viewingLead?.id === id) setViewingLead(null);
      } catch (err) {
        console.error("Failed to delete lead:", err);
      }
    }
  };

  const handleExportCurrentView = () => {
    exportLeadsCSV(filteredLeads);
  };

  const currentTab = SOURCE_TABS.find((t) => t.id === activeTab);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      {/* Header */}
      <header className="border-b border-zinc-900 bg-zinc-950/95 backdrop-blur-xl sticky top-0 z-40">
        <div className="container px-5 sm:px-6 mx-auto py-4 sm:py-5 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">Admin Dashboard</h1>
            <p className="text-zinc-400 text-[10px] sm:text-xs hidden sm:block">Lead & Financial Manager (Supabase Connected)</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button
              onClick={handleExportCurrentView}
              className="h-9 sm:h-10 px-3 sm:px-4 rounded-full bg-zinc-900 border border-zinc-800 text-white text-xs sm:text-sm font-medium hover:bg-zinc-800 transition-colors flex items-center gap-1.5 sm:gap-2"
            >
              <Download size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden md:inline">Export CSV</span>
            </button>

            <Link
              href="/"
              className="h-9 sm:h-10 px-3 sm:px-4 rounded-full bg-zinc-900 border border-zinc-800 text-white text-xs sm:text-sm font-medium hover:bg-zinc-800 transition-colors flex items-center gap-1.5 sm:gap-2"
            >
              <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden md:inline">Back to Site</span>
            </Link>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setUserMenuOpen(!userMenuOpen);
                }}
                className="h-9 sm:h-10 pl-2 pr-3 sm:pl-2.5 sm:pr-4 rounded-full bg-white text-black text-xs sm:text-sm font-semibold hover:bg-zinc-200 transition-colors flex items-center gap-2"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-zinc-900 text-white text-[10px] sm:text-xs font-bold flex items-center justify-center uppercase">
                  {username.slice(0, 1)}
                </div>
                <span className="hidden sm:inline truncate max-w-[120px]">{username}</span>
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden"
                  >
                    <div className="p-3 border-b border-zinc-800">
                      <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-medium mb-1">Signed in as</p>
                      <p className="text-white text-sm font-semibold truncate">{username}</p>
                    </div>
                    <div className="p-1">
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          navigate.push("/admin/setup");
                        }}
                        className="w-full px-3 py-2 rounded-lg text-left text-xs sm:text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors flex items-center gap-2.5"
                      >
                        <Settings size={14} />
                        Change credentials
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full px-3 py-2 rounded-lg text-left text-xs sm:text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2.5"
                      >
                        <LogOut size={14} />
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      <div className="container px-5 sm:px-6 mx-auto py-8 sm:py-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10">
          {[
            { label: "Total Leads", value: stats.total, icon: Users, color: "text-white" },
            { label: "Pipeline Value", value: formatCurrency(stats.totalPipeline), icon: DollarSign, color: "text-emerald-400" },
            { label: "Won Value", value: formatCurrency(stats.wonValue), icon: TrendingUp, color: "text-blue-400" },
            { label: "Conversion", value: `${stats.conversionRate}%`, icon: BarChart3, color: "text-yellow-400" },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-zinc-900/50 border border-zinc-800"
              >
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <div className={`p-2 rounded-lg bg-zinc-800 ${stat.color}`}>
                    <Icon size={16} className="sm:w-5 sm:h-5" />
                  </div>
                </div>
                <div className={`text-2xl sm:text-3xl font-bold mb-1 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-zinc-400 text-[10px] sm:text-xs uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CRM Analytics Panel */}
        <div className="mb-8 border border-zinc-800/80 rounded-2xl bg-zinc-900/10 overflow-hidden">
          <button
            onClick={() => setAnalyticsOpen(!analyticsOpen)}
            className="w-full px-5 sm:px-6 py-4 flex items-center justify-between bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors border-b border-zinc-800/80 cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <BarChart3 className="text-emerald-400" size={18} />
              <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-mono">CRM Analytics & Forecasting Funnel</span>
            </div>
            <motion.div
              animate={{ rotate: analyticsOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight size={16} className="text-zinc-400 rotate-90" />
            </motion.div>
          </button>
          
          <AnimatePresence initial={false}>
            {analyticsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 border-b border-zinc-800/80 bg-zinc-950/20">
                  {/* Left Column: Line Graph */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold font-mono">7-Day Activity Trend</h3>
                      <div className="flex items-center gap-3 text-[9px] font-mono">
                        <span className="flex items-center gap-1.5 text-purple-400 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                          Leads (vol)
                        </span>
                        <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Budget value
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-900/80">
                      {leads.length === 0 ? (
                        <div className="h-40 flex items-center justify-center text-zinc-700 text-xs font-mono">
                          No leads logged to graph weekly metrics.
                        </div>
                      ) : (
                        <div className="relative">
                          {/* SVG Line & Area chart */}
                          <svg viewBox="0 0 100 45" className="w-full h-40 overflow-visible" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="leadsGlow" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
                                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                              </linearGradient>
                              <linearGradient id="valueGlow" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                            
                            {/* Grid Lines */}
                            <line x1="0" y1="5" x2="100" y2="5" stroke="#27272a" strokeWidth="0.1" strokeDasharray="1" />
                            <line x1="0" y1="20" x2="100" y2="20" stroke="#27272a" strokeWidth="0.1" strokeDasharray="1" />
                            <line x1="0" y1="35" x2="100" y2="35" stroke="#27272a" strokeWidth="0.1" strokeDasharray="1" />
                            <line x1="0" y1="40" x2="100" y2="40" stroke="#3f3f46" strokeWidth="0.2" />

                            {/* Chart lines */}
                            {(() => {
                              const maxL = Math.max(...chartData.map(d => d.leads), 3);
                              const maxVal = Math.max(...chartData.map(d => d.value), 50000);
                              
                              const leadPts = chartData.map((d, i) => {
                                const x = (i / 6) * 100;
                                const y = 40 - (d.leads / maxL) * 32 - 2;
                                return `${x},${y}`;
                              }).join(" ");

                              const valPts = chartData.map((d, i) => {
                                const x = (i / 6) * 100;
                                const y = 40 - (d.value / maxVal) * 32 - 2;
                                return `${x},${y}`;
                              }).join(" ");

                              return (
                                <>
                                  <path d={`M 0,40 L ${leadPts} L 100,40 Z`} fill="url(#leadsGlow)" />
                                  <path d={`M 0,40 L ${valPts} L 100,40 Z`} fill="url(#valueGlow)" />
                                  
                                  <polyline fill="none" stroke="#8b5cf6" strokeWidth="1.2" points={leadPts} className="drop-shadow-[0_2px_4px_rgba(139,92,246,0.3)]" />
                                  <polyline fill="none" stroke="#10b981" strokeWidth="1.2" points={valPts} className="drop-shadow-[0_2px_4px_rgba(16,185,129,0.3)]" />
                                  
                                  {chartData.map((d, i) => {
                                    const lx = (i / 6) * 100;
                                    const ly = 40 - (d.leads / maxL) * 32 - 2;
                                    const vy = 40 - (d.value / maxVal) * 32 - 2;
                                    return (
                                      <g key={i}>
                                        <circle cx={lx} cy={ly} r="0.8" fill="#8b5cf6" />
                                        <circle cx={lx} cy={vy} r="0.8" fill="#10b981" />
                                      </g>
                                    );
                                  })}
                                </>
                              );
                            })()}
                          </svg>
                          
                          {/* Label X axis */}
                          <div className="flex justify-between mt-2 text-[8px] sm:text-[9px] text-zinc-400 font-mono font-medium px-1">
                            {chartData.map((d, i) => (
                              <div key={i} className="text-center w-12 truncate">{d.date}</div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Right Column: Funnel */}
                  <div className="space-y-3">
                    <h3 className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold font-mono">Conversion Funnel Progression</h3>
                    <div className="p-5 rounded-xl bg-zinc-950/70 border border-zinc-900/80 flex flex-col justify-center min-h-[194px]">
                      {leads.length === 0 ? (
                        <div className="text-center text-zinc-700 text-xs font-mono">
                          No funnel details to render.
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {funnelData.map((stage, i) => {
                            const widthPercent = Math.max(stage.percentage, 15);
                            const bgGradients = [
                              "from-purple-500/10 to-purple-500/25 border-purple-500/20 text-purple-400",
                              "from-indigo-500/10 to-indigo-500/25 border-indigo-500/20 text-indigo-400",
                              "from-blue-500/10 to-blue-500/25 border-blue-500/20 text-blue-400",
                              "from-emerald-500/10 to-emerald-500/25 border-emerald-500/20 text-emerald-400"
                            ];
                            return (
                              <div key={stage.label} className="flex items-center gap-3">
                                <span className="w-20 text-[10px] sm:text-xs text-zinc-400 font-semibold">{stage.label}</span>
                                <div className="flex-1">
                                  <div
                                    className={`h-7 rounded-lg border bg-gradient-to-r ${bgGradients[i]} flex items-center justify-between px-3 transition-all duration-500`}
                                    style={{ width: `${widthPercent}%` }}
                                  >
                                    <span className="text-[10px] font-bold font-mono">{stage.count} leads</span>
                                    <span className="text-[10px] font-bold font-mono">{stage.percentage}%</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Pipeline Stages Cards Board */}
                <div className="p-5 sm:p-6 bg-zinc-950/40">
                  <h3 className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold font-mono mb-4">Pipeline Stages (Status Filters)</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                    {(["new", "contacted", "confirmed", "done", "declined"] as const).map((stageKey) => {
                      const stage = pipelineStages[stageKey] || { count: 0, value: 0 };
                      const label = STATUS_LABELS[stageKey];
                      const active = filterStatus === stageKey;
                      
                      const colors: Record<LeadStatus, { text: string; bg: string; border: string }> = {
                        new: { text: "text-blue-400", bg: "bg-blue-500/5", border: "border-blue-500/25" },
                        contacted: { text: "text-yellow-400", bg: "bg-yellow-500/5", border: "border-yellow-500/25" },
                        confirmed: { text: "text-purple-400", bg: "bg-purple-500/5", border: "border-purple-500/25" },
                        done: { text: "text-emerald-400", bg: "bg-emerald-500/5", border: "border-emerald-500/25" },
                        declined: { text: "text-red-400", bg: "bg-red-500/5", border: "border-red-500/25" }
                      };
                      const cl = colors[stageKey];

                      return (
                        <button
                          key={stageKey}
                          onClick={() => setFilterStatus(filterStatus === stageKey ? "all" : stageKey)}
                          className={`text-left p-4 rounded-xl border flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                            active
                              ? "bg-white text-black border-white shadow-xl shadow-white/5"
                              : `bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700`
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className={`text-[9px] uppercase font-extrabold tracking-wider ${active ? "text-black/60" : "text-zinc-400"}`}>
                                {label}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold ${
                                active ? "bg-black/15 text-black" : `${cl.bg} ${cl.text} border ${cl.border}`
                              }`}>
                                {stage.count}
                              </span>
                            </div>
                            <div className={`text-base sm:text-lg font-extrabold font-mono ${active ? "text-black" : "text-white"}`}>
                              {formatCurrency(stage.value)}
                            </div>
                          </div>
                          <span className={`text-[8px] font-semibold mt-3 ${active ? "text-black/45" : "text-zinc-400"}`}>
                            {active ? "⚡ Active Filter (Reset)" : "Filter table"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Source Tabs (Separate views for each form type) */}
        <div className="mb-6 sm:mb-8 overflow-x-auto no-scrollbar -mx-5 sm:mx-0 px-5 sm:px-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-max pb-2">
            {SOURCE_TABS.map((tab) => {
              const Icon = tab.icon;
              const count = sourceCounts[tab.id] || 0;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setFilterStatus("all");
                  }}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap border ${
                    isActive
                      ? "bg-white text-black border-white"
                      : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white hover:border-zinc-700"
                  }`}
                >
                  <Icon size={14} className={`sm:w-4 sm:h-4 ${isActive ? "" : tab.color}`} />
                  <span>{tab.label}</span>
                  <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono ${isActive ? "bg-black/10" : "bg-zinc-800"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Tab Header */}
        {currentTab && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-5 sm:mb-6 flex items-center justify-between flex-wrap gap-3"
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center ${currentTab.color}`}>
                <currentTab.icon size={16} className="sm:w-5 sm:h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white">{currentTab.label}</h2>
                <p className="text-zinc-400 text-[10px] sm:text-xs">
                  {filteredLeads.length} {filteredLeads.length === 1 ? "lead" : "leads"}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Status filters & Search */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-5 sm:mb-6">
          <div className="flex flex-wrap gap-2">
            {(["all", "new", "contacted", "confirmed", "declined", "done"] as const).map((status) => {
              const count = status === "all"
                ? (activeTab === "all" ? leads.length : leads.filter(l => l.source === activeTab).length)
                : leads.filter(l => l.status === status && (activeTab === "all" || l.source === activeTab)).length;
              const isActive = filterStatus === status;
              return (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-all ${
                    isActive
                      ? "bg-white text-black"
                      : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  {status === "all" ? "All" : STATUS_LABELS[status as LeadStatus]}
                  <span className="ml-1.5 opacity-60">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-md sm:ml-auto">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 sm:w-4 sm:h-4" />
            <input
              type="text"
              placeholder="Search name, email, company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 sm:h-11 pl-10 sm:pl-11 pr-4 rounded-lg sm:rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs sm:text-sm placeholder:text-zinc-400 focus:outline-none focus:border-zinc-600 transition-colors"
            />
          </div>
        </div>

        {/* Leads Table */}
        <div className="rounded-xl sm:rounded-2xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-zinc-800 bg-zinc-900/50">
                <tr>
                  {["Lead", ...(activeTab === "all" ? ["Source"] : []), "Status", "Budget", ...(activeTab === "quotation" ? ["Project", "Timeline"] : []), ...(activeTab === "call" ? ["Scheduled"] : []), "Date", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs uppercase tracking-wider text-zinc-400 font-medium whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {loading ? (
                  <tr>
                    <td colSpan={10} className="px-4 sm:px-6 py-12 sm:py-16 text-center">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="w-8 h-8 border-2 border-zinc-800 border-t-white rounded-full animate-spin" />
                        <span className="text-zinc-400 text-xs sm:text-sm font-medium">Fetching from Supabase...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-4 sm:px-6 py-12 sm:py-16 text-center">
                      <div className="text-zinc-400 text-sm">
                        {search ? "No leads match your search." : `No ${currentTab?.label.toLowerCase()} yet. They will appear here.`}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-zinc-900/50 transition-colors cursor-pointer" onClick={() => setViewingLead(lead)}>
                      <td className="px-4 sm:px-6 py-4 sm:py-5">
                        <div className="min-w-[180px]">
                          <div className="text-white font-medium text-sm">{lead.name}</div>
                          <div className="text-zinc-400 text-xs truncate max-w-[200px]">{lead.email}</div>
                          {lead.company && (
                            <div className="text-zinc-400 text-[10px] mt-0.5">{lead.company}</div>
                          )}
                          {lead.phone && (
                            <div className="text-zinc-400 text-[10px] mt-0.5">📱 {lead.phone}</div>
                          )}
                        </div>
                      </td>
                      {activeTab === "all" && (
                        <td className="px-4 sm:px-6 py-4 sm:py-5">
                          <SourceBadge source={lead.source} />
                        </td>
                      )}
                      <td className="px-4 sm:px-6 py-4 sm:py-5">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                          onClick={(e) => e.stopPropagation()}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-medium border cursor-pointer focus:outline-none focus:ring-1 focus:ring-white/20 ${STATUS_COLORS[lead.status]}`}
                        >
                          {Object.entries(STATUS_LABELS).map(([value, label]) => (
                            <option key={value} value={value} className="bg-zinc-900">
                              {label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 sm:px-6 py-4 sm:py-5">
                        {editingId === lead.id ? (
                          <input
                            type="text"
                            value={editData.budget || ""}
                            onChange={(e) => setEditData({ ...editData, budget: e.target.value })}
                            onClick={(e) => e.stopPropagation()}
                            placeholder="₹25K"
                            className="w-24 px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-white text-xs focus:outline-none focus:border-zinc-600"
                            autoFocus
                          />
                        ) : (
                          <span className="text-zinc-300 text-sm font-mono">
                            {lead.budget || "—"}
                          </span>
                        )}
                      </td>
                      {activeTab === "quotation" && (
                        <>
                          <td className="px-4 sm:px-6 py-4 sm:py-5">
                            <span className="text-zinc-300 text-xs">{lead.projectType || "—"}</span>
                          </td>
                          <td className="px-4 sm:px-6 py-4 sm:py-5">
                            <span className="text-zinc-300 text-xs">{lead.timeline || "—"}</span>
                          </td>
                        </>
                      )}
                      {activeTab === "call" && (
                        <td className="px-4 sm:px-6 py-4 sm:py-5">
                          {lead.scheduledDate ? (
                            <div className="text-emerald-400 text-xs">
                              📅 {new Date(lead.scheduledDate).toLocaleDateString()}
                              <div className="text-emerald-400/70 text-[10px] mt-0.5">{lead.scheduledTime}</div>
                            </div>
                          ) : (
                            <span className="text-zinc-400">—</span>
                          )}
                        </td>
                      )}
                      <td className="px-4 sm:px-6 py-4 sm:py-5">
                        <div className="text-zinc-400 text-xs whitespace-nowrap">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-zinc-400 text-[10px] mt-0.5">
                          {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 sm:py-5" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-1.5">
                          {editingId === lead.id ? (
                            <>
                              <button
                                onClick={() => handleSave(lead.id)}
                                className="p-1.5 rounded-lg bg-emerald-400/10 text-emerald-400 hover:bg-emerald-400/20 transition-colors"
                                title="Save"
                              >
                                <Save size={14} />
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-zinc-700 transition-colors"
                                title="Cancel"
                              >
                                <X size={14} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => setViewingLead(lead)}
                                className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-blue-400/10 hover:text-blue-400 transition-colors"
                                title="View details"
                              >
                                <Eye size={14} />
                              </button>
                              <button
                                onClick={() => handleEdit(lead)}
                                className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors"
                                title="Edit budget"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                onClick={() => handleDelete(lead.id)}
                                className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                                title="Delete"
                              >
                                <Trash2 size={14} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-zinc-700 text-[10px] sm:text-xs text-center mt-6 sm:mt-8">
          Data stored securely in your Supabase backend database.
        </p>
      </div>

      {/* Lead Detail Drawer */}
      <AnimatePresence>
        {viewingLead && (
          <LeadDetailDrawer
            lead={viewingLead}
            onClose={() => setViewingLead(null)}
            onStatusChange={(status) => handleStatusChange(viewingLead.id, status)}
            onDelete={() => handleDelete(viewingLead.id)}
            onUpdate={async (id, updates) => {
              const updated = await updateLead(id, updates);
              if (updated) {
                const freshLeads = await getLeads();
                setLeads(freshLeads);
                setViewingLead(updated);
              }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function SourceBadge({ source }: { source: LeadSource }) {
  const config: Record<LeadSource, { label: string; color: string; icon: React.ComponentType<{ size?: number; className?: string }> }> = {
    call: { label: "Call", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", icon: Phone },
    audit: { label: "Audit", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", icon: Sparkles },
    quotation: { label: "Quote", color: "text-blue-400 bg-blue-400/10 border-blue-400/20", icon: Calculator },
    demo: { label: "Demo", color: "text-purple-400 bg-purple-400/10 border-purple-400/20", icon: FileText },
    contact: { label: "Contact", color: "text-zinc-400 bg-zinc-800 border-zinc-700", icon: Users },
  };
  const cfg = config[source];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium border ${cfg.color}`}>
      <Icon size={10} />
      {cfg.label}
    </span>
  );
}

interface LeadDetailDrawerProps {
  lead: Lead;
  onClose: () => void;
  onStatusChange: (status: LeadStatus) => void;
  onDelete: () => void;
  onUpdate: (id: string, updates: Partial<Lead>) => Promise<void>;
}

function LeadDetailDrawer({ lead, onClose, onStatusChange, onDelete, onUpdate }: LeadDetailDrawerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentForm, setPaymentForm] = useState({ ref: lead.paymentReference || "", gst: lead.gstApplicable || false });
  const [formData, setFormData] = useState({
    name: lead.name || "",
    email: lead.email || "",
    phone: lead.phone || "",
    company: lead.company || "",
    website: lead.website || "",
    projectType: lead.projectType || "",
    timeline: lead.timeline || "",
    budget: lead.budget || "",
    message: lead.message || lead.vision || lead.challenge || lead.requirements || "",
    notes: lead.notes || "",
  });

  useEffect(() => {
    setFormData({
      name: lead.name || "",
      email: lead.email || "",
      phone: lead.phone || "",
      company: lead.company || "",
      website: lead.website || "",
      projectType: lead.projectType || "",
      timeline: lead.timeline || "",
      budget: lead.budget || "",
      message: lead.message || lead.vision || lead.challenge || lead.requirements || "",
      notes: lead.notes || "",
    });
    setPaymentForm({ ref: lead.paymentReference || "", gst: lead.gstApplicable || false });
    setIsEditing(false);
    setShowPaymentForm(false);
  }, [lead]);

  const handleSave = async () => {
    setSubmitting(true);
    try {
      const updates: Partial<Lead> = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        website: formData.website,
        projectType: formData.projectType,
        timeline: formData.timeline,
        budget: formData.budget,
        notes: formData.notes,
      };

      if (lead.requirements) {
        updates.requirements = formData.message;
      } else if (lead.vision) {
        updates.vision = formData.message;
      } else if (lead.challenge) {
        updates.challenge = formData.message;
      } else {
        updates.message = formData.message;
      }

      await onUpdate(lead.id, updates);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update lead details:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-zinc-950/70 backdrop-blur-sm"
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-zinc-900 border-l border-zinc-800 overflow-y-auto overscroll-contain"
        data-lenis-prevent
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-zinc-900/95 backdrop-blur-xl border-b border-zinc-800 p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
              {(formData.name || "Lead").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-white truncate">{formData.name || "Lead Details"}</h3>
              <p className="text-zinc-400 text-xs truncate">{formData.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="h-9 px-3.5 rounded-full border border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-zinc-400 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Edit details"
              >
                <Edit2 size={12} />
                Edit
              </button>
            )}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full border border-zinc-800 bg-zinc-950 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {isEditing ? (
          <div className="p-5 sm:p-6 space-y-5">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-medium mb-1.5">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full h-10 px-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs sm:text-sm focus:outline-none focus:border-zinc-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-medium mb-1.5">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-10 px-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs sm:text-sm focus:outline-none focus:border-zinc-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-medium mb-1.5">Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full h-10 px-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs sm:text-sm focus:outline-none focus:border-zinc-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-medium mb-1.5">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full h-10 px-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs sm:text-sm focus:outline-none focus:border-zinc-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-medium mb-1.5">Website</label>
              <input
                type="text"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full h-10 px-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs sm:text-sm focus:outline-none focus:border-zinc-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-medium mb-1.5">Project Type</label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full h-10 px-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs sm:text-sm focus:outline-none focus:border-zinc-600 transition-colors cursor-pointer"
              >
                <option value="">—</option>
                {["Website", "Web Application", "Mobile App", "Custom Software", "AI Solution", "UI/UX Design", "SEO & Growth", "Other"].map((opt) => (
                  <option key={opt} value={opt} className="bg-zinc-900">{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-medium mb-1.5">Budget</label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full h-10 px-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs sm:text-sm focus:outline-none focus:border-zinc-600 transition-colors cursor-pointer"
              >
                <option value="">—</option>
                {["Under ₹50K", "₹50K – ₹1L", "₹1L – ₹5L", "₹5L – ₹15L", "₹15L+", "Not sure yet"].map((opt) => (
                  <option key={opt} value={opt} className="bg-zinc-900">{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-medium mb-1.5">Timeline</label>
              <select
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                className="w-full h-10 px-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs sm:text-sm focus:outline-none focus:border-zinc-600 transition-colors cursor-pointer"
              >
                <option value="">—</option>
                {["ASAP (Urgent)", "1–2 weeks", "1 month", "2–3 months", "Flexible"].map((opt) => (
                  <option key={opt} value={opt} className="bg-zinc-900">{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-medium mb-1.5">Message / Requirements</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs sm:text-sm focus:outline-none focus:border-zinc-600 transition-colors resize-none font-sans"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-medium mb-1.5">Internal Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs sm:text-sm focus:outline-none focus:border-zinc-600 transition-colors resize-none font-sans"
              />
            </div>

            <div className="pt-4 border-t border-zinc-800 flex gap-3">
              <button
                onClick={handleSave}
                disabled={submitting}
                className="flex-1 h-11 rounded-full bg-white text-black text-xs font-semibold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors disabled:opacity-50"
              >
                <Save size={14} />
                {submitting ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="h-11 px-6 rounded-full bg-zinc-850 border border-zinc-800 text-zinc-300 text-xs font-semibold hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5 sm:p-6 space-y-6">
            {/* Quick info row */}
            <div className="flex items-center gap-2 flex-wrap">
              <SourceBadge source={lead.source} />
              <select
                value={lead.status}
                onChange={(e) => onStatusChange(e.target.value as LeadStatus)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-medium border cursor-pointer focus:outline-none ${STATUS_COLORS[lead.status]}`}
              >
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value} className="bg-zinc-900">
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Contact info */}
            <DetailGroup title="Contact">
              <DetailRow label="Name" value={lead.name} />
              <DetailRow label="Email" value={lead.email} copyable />
              {lead.phone && <DetailRow label="Phone" value={lead.phone} copyable />}
              {lead.company && <DetailRow label="Company" value={lead.company} />}
              {lead.website && <DetailRow label="Website" value={lead.website} link />}
            </DetailGroup>

            {/* Project info */}
            {(lead.budget || lead.projectType || lead.timeline) && (
              <DetailGroup title="Project Details">
                {lead.projectType && <DetailRow label="Type" value={lead.projectType} />}
                {lead.timeline && <DetailRow label="Timeline" value={lead.timeline} />}
                {lead.budget && <DetailRow label="Budget" value={lead.budget} highlight="emerald" />}
              </DetailGroup>
            )}

            {/* Scheduled */}
            {lead.scheduledDate && (
              <DetailGroup title="Scheduled Call">
                <DetailRow label="Date" value={new Date(lead.scheduledDate).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" })} />
                {lead.scheduledTime && <DetailRow label="Time" value={`${lead.scheduledTime} IST`} highlight="emerald" />}
              </DetailGroup>
            )}

            {/* Message / Vision / Challenge / Requirements */}
            {(lead.message || lead.vision || lead.challenge || lead.requirements) && (
              <DetailGroup title="Message">
                <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                  {lead.requirements || lead.vision || lead.challenge || lead.message}
                </p>
              </DetailGroup>
            )}

            {/* Notes (editable) */}
            {lead.notes && (
              <DetailGroup title="Internal Notes">
                <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-wrap italic font-sans">
                  {lead.notes}
                </p>
              </DetailGroup>
            )}

            {/* Payment & Invoice */}
            {lead.status === "done" && (
              <DetailGroup title="Payment & Invoice">
                {lead.paymentReference ? (
                  <>
                    <DetailRow label="Payment Ref" value={lead.paymentReference} mono highlight="emerald" />
                    <DetailRow label="GST Applicable" value={lead.gstApplicable ? "Yes" : "No"} />
                    {lead.paymentDate && <DetailRow label="Paid On" value={new Date(lead.paymentDate).toLocaleDateString()} />}
                    <div className="mt-3">
                      <Link
                        href={`/admin/invoice/${lead.id}`}
                        target="_blank"
                        className="h-9 px-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-colors flex items-center justify-center gap-2"
                      >
                        <FileText size={14} />
                        View / Print Invoice
                      </Link>
                    </div>
                  </>
                ) : showPaymentForm ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-medium mb-1.5">Payment Reference</label>
                      <input
                        type="text"
                        placeholder="e.g. TXN123456"
                        value={paymentForm.ref}
                        onChange={(e) => setPaymentForm({ ...paymentForm, ref: e.target.value })}
                        className="w-full h-9 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-zinc-600 transition-colors"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="gst-checkbox"
                        checked={paymentForm.gst}
                        onChange={(e) => setPaymentForm({ ...paymentForm, gst: e.target.checked })}
                        className="rounded border-zinc-800 bg-zinc-900 text-emerald-500 focus:ring-emerald-500/20"
                      />
                      <label htmlFor="gst-checkbox" className="text-xs text-zinc-300">GST Applicable</label>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={async () => {
                          setSubmitting(true);
                          await onUpdate(lead.id, { paymentReference: paymentForm.ref, gstApplicable: paymentForm.gst, paymentDate: new Date().toISOString() });
                          setShowPaymentForm(false);
                          setSubmitting(false);
                        }}
                        disabled={submitting || !paymentForm.ref}
                        className="flex-1 h-8 rounded-md bg-white text-black text-[11px] font-semibold flex items-center justify-center disabled:opacity-50 hover:bg-zinc-200"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setShowPaymentForm(false)}
                        className="flex-1 h-8 rounded-md bg-zinc-800 text-zinc-300 text-[11px] font-semibold flex items-center justify-center hover:bg-zinc-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowPaymentForm(true)}
                    className="w-full h-9 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <DollarSign size={14} />
                    Confirm Payment
                  </button>
                )}
              </DetailGroup>
            )}

            {/* Metadata */}
            <DetailGroup title="Metadata">
              <DetailRow label="Created" value={new Date(lead.createdAt).toLocaleString()} />
              <DetailRow label="Last Updated" value={new Date(lead.updatedAt).toLocaleString()} />
              <DetailRow label="Lead ID" value={lead.id} mono />
            </DetailGroup>

            {/* Actions */}
            <div className="pt-4 border-t border-zinc-800 flex gap-3">
              <a
                href={`mailto:${lead.email}?subject=${encodeURIComponent("Re: Your inquiry to The Webpage Builder")}`}
                className="flex-1 h-11 rounded-full bg-white text-black text-xs font-semibold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors"
              >
                Reply via Email
                <ChevronRight size={14} />
              </a>
              <button
                onClick={onDelete}
                className="h-11 px-4 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-colors flex items-center gap-1.5"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}

function DetailGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-[10px] uppercase tracking-widest text-zinc-400 font-medium mb-3">
        {title}
      </h4>
      <div className="space-y-2.5 p-4 rounded-xl bg-zinc-950/50 border border-zinc-800/50">
        {children}
      </div>
    </div>
  );
}

interface DetailRowProps {
  label: string;
  value: string;
  copyable?: boolean;
  link?: boolean;
  mono?: boolean;
  highlight?: "emerald" | "blue";
}

function DetailRow({ label, value, copyable, link, mono, highlight }: DetailRowProps) {
  const valueColor = highlight === "emerald"
    ? "text-emerald-400"
    : highlight === "blue"
      ? "text-blue-400"
      : "text-zinc-200";

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="flex items-start justify-between gap-3 text-xs">
      <span className="text-zinc-400 flex-shrink-0">{label}</span>
      {link ? (
        <a
          href={value.startsWith("http") ? value : `https://${value}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${valueColor} hover:text-white transition-colors text-right break-all ${mono ? "font-mono text-[10px]" : ""} underline decoration-zinc-700`}
        >
          {value}
        </a>
      ) : copyable ? (
        <button
          onClick={handleCopy}
          className={`${valueColor} hover:text-white transition-colors text-right break-all ${mono ? "font-mono text-[10px]" : ""}`}
          title="Click to copy"
        >
          {value}
        </button>
      ) : (
        <span className={`${valueColor} text-right break-all ${mono ? "font-mono text-[10px]" : ""}`}>
          {value}
        </span>
      )}
    </div>
  );
}
