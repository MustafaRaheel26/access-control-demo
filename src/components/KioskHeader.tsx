import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Shield, Clock, Monitor, Smartphone, RotateCcw } from 'lucide-react';
import { KioskConfig } from '../types';

interface KioskHeaderProps {
  config: KioskConfig;
  soundEnabled: boolean;
  onToggleSound: () => void;
  kioskMode: 'portrait' | 'fullscreen';
  onToggleKioskMode: () => void;
  onQuickScenario?: (scenario: 'all_yes' | 'fail_shoe' | 'fail_helmet' | 'reset') => void;
  currentScreen: string;
}

export const KioskHeader: React.FC<KioskHeaderProps> = ({
  config,
  soundEnabled,
  onToggleSound,
  kioskMode,
  onToggleKioskMode,
  onQuickScenario,
  currentScreen,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      id="kiosk-header"
      className="w-full bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 text-slate-200 px-3 sm:px-4 py-2 sm:py-2.5 select-none flex items-center justify-between gap-2 sm:gap-4 shadow-md z-30 shrink-0 max-w-full overflow-hidden"
    >
      {/* Terminal Identifier & Status */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-800 border border-slate-700 text-cyan-400 shrink-0">
          <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[11px] sm:text-xs font-bold tracking-wider text-slate-100 uppercase truncate">
              {config.terminalId}
            </span>
            <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="hidden xs:inline">ONLINE</span>
            </span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium truncate max-w-[140px] sm:max-w-[220px]">
            {config.locationName}
          </p>
        </div>
      </div>

      {/* Center Demo Presets / Quick Test Controls */}
      {onQuickScenario && (
        <div className="hidden lg:flex items-center gap-1.5 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 text-xs font-mono">
          <span className="text-slate-400 text-[11px] mr-1">DEMO PRESETS:</span>
          <button
            id="demo-btn-pass"
            type="button"
            onClick={() => onQuickScenario('all_yes')}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-emerald-900/60 hover:text-emerald-300 text-slate-300 transition-colors cursor-pointer text-[11px]"
            title="Auto-fill all YES answers to demonstrate Access Approved"
          >
            Pass (All YES)
          </button>
          <button
            id="demo-btn-fail"
            type="button"
            onClick={() => onQuickScenario('fail_shoe')}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-rose-900/60 hover:text-rose-300 text-slate-300 transition-colors cursor-pointer text-[11px]"
            title="Auto-fill with NO for safety shoes to demonstrate Access Denied"
          >
            Fail (No Shoes)
          </button>
          <button
            id="demo-btn-reset"
            type="button"
            onClick={() => onQuickScenario('reset')}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Reset to Welcome Screen"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Right Controls: Clock, Sound Toggle, Kiosk View Toggle */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Real-time Clock */}
        <div className="hidden sm:flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-md text-slate-300 font-mono text-xs border border-slate-700/60">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{timeStr || '00:00:00'}</span>
        </div>

        {/* Audio Toggle */}
        <button
          id="toggle-sound-btn"
          type="button"
          onClick={onToggleSound}
          className={`p-1.5 sm:p-2 rounded-lg border text-xs flex items-center justify-center transition-colors cursor-pointer ${
            soundEnabled
              ? 'bg-slate-800 border-slate-700 text-cyan-400 hover:bg-slate-700'
              : 'bg-slate-900 border-slate-800 text-slate-500 hover:bg-slate-800'
          }`}
          title={soundEnabled ? 'Mute Touchscreen Audio' : 'Enable Touchscreen Audio'}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
        </button>

        {/* Layout Mode Toggle (Vertical Kiosk Stand vs Full Screen) */}
        <button
          id="toggle-layout-mode-btn"
          type="button"
          onClick={onToggleKioskMode}
          className="p-1.5 sm:p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
          title={kioskMode === 'portrait' ? 'Switch to Fullscreen Screen Mode' : 'Switch to Vertical Kiosk Stand Frame'}
        >
          {kioskMode === 'portrait' ? <Monitor className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
        </button>
      </div>
    </header>
  );
};
