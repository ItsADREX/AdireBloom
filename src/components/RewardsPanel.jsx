import { useState } from 'react';
import { Gift, X, ExternalLink, Check } from 'lucide-react';
import { rewardTasks } from '../data/promotions';

const UNLOCKED_KEY = 'adirebloom_unlocked_codes';
const PANEL_KEY = 'adirebloom_rewards_seen';

function readUnlocked() {
  try {
    return JSON.parse(localStorage.getItem(UNLOCKED_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveUnlocked(codes) {
  localStorage.setItem(UNLOCKED_KEY, JSON.stringify(codes));
}

export default function RewardsPanel() {
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(readUnlocked);
  const [copiedCode, setCopiedCode] = useState('');

  const close = () => {
    setOpen(false);
    localStorage.setItem(PANEL_KEY, '1');
  };

  const claimTask = (task) => {
    window.open(task.href, '_blank', 'noopener,noreferrer');
    setUnlocked((prev) => {
      if (prev.includes(task.code)) return prev;
      const next = [...prev, task.code];
      saveUnlocked(next);
      return next;
    });
  };

  const copyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      window.setTimeout(() => setCopiedCode(''), 2000);
    } catch {
      /* ignore */
    }
  };

  const pendingCount = rewardTasks.filter((t) => !unlocked.includes(t.code)).length;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 left-5 z-40 flex items-center gap-2 px-3 py-2 bg-white border border-cream-200 shadow-md rounded-full text-xs font-body font-medium text-ink/70 hover:border-indigo/40 hover:text-indigo transition-all"
        aria-label="View reward discounts"
      >
        <Gift size={15} className="text-gold" />
        <span className="hidden sm:inline">Earn 5% off</span>
        {pendingCount > 0 && (
          <span className="w-5 h-5 rounded-full bg-terracotta text-white text-[10px] font-semibold flex items-center justify-center">
            {pendingCount}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-ink/40 backdrop-blur-[2px]">
          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in"
            role="dialog"
            aria-labelledby="rewards-title"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-cream-200 bg-cream-50">
              <div>
                <p id="rewards-title" className="font-display text-xl font-semibold text-indigo">
                  Small thank-yous
                </p>
                <p className="text-xs font-body text-ink/55 mt-0.5">
                  Modest 5% codes for supporting us — apply at checkout.
                </p>
              </div>
              <button type="button" onClick={close} className="p-1.5 text-ink/40 hover:text-ink" aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <ul className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
              {rewardTasks.map((task) => {
                const done = unlocked.includes(task.code);
                return (
                  <li
                    key={task.id}
                    className={`p-4 rounded-xl border ${done ? 'border-indigo/20 bg-indigo/5' : 'border-cream-200 bg-white'}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-body text-sm font-semibold text-ink">{task.label}</p>
                        <p className="font-body text-xs text-ink/55 mt-1 leading-relaxed">{task.description}</p>
                      </div>
                      {done && (
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo text-white flex items-center justify-center">
                          <Check size={14} />
                        </span>
                      )}
                    </div>

                    {done ? (
                      <div className="mt-3 flex items-center gap-2">
                        <code className="flex-1 px-2.5 py-1.5 bg-white border border-dashed border-indigo/25 text-xs font-mono font-semibold text-indigo">
                          {task.code}
                        </code>
                        <button
                          type="button"
                          onClick={() => copyCode(task.code)}
                          className="text-[11px] font-body font-semibold uppercase tracking-wider text-indigo hover:underline"
                        >
                          {copiedCode === task.code ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => claimTask(task)}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-body font-semibold uppercase tracking-wider text-indigo hover:text-indigo-mid transition-colors"
                      >
                        Visit profile & unlock
                        <ExternalLink size={12} />
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>

            <p className="px-5 pb-4 text-[10px] font-body text-ink/45 leading-relaxed">
              One code per order. We trust you followed us — thank you for growing the AdireBloom community.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export { readUnlocked, UNLOCKED_KEY };
