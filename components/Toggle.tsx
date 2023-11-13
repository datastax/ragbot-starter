const Toggle = ({ enabled, label, onChange }) => {
  return (
    <div className="flex items-center justify-center w-full self-end">
      <label htmlFor="toggle" className="flex items-center cursor-pointer py-2">
        <div className="relative">
          {/* Toggle Line */}
          <div className={`w-10 h-6 bg-gray-400 rounded-full shadow-inner ${enabled ? 'toggle-background' : ''}`}></div>
          {/* Toggle Circle */}
          <div className={`absolute -left-1 -top-0 transition transform bg-white border-2 rounded-full w-6 h-6 ${enabled ? 'translate-x-full toggle-boarder' : 'border-gray-400'}`}></div>
        </div>
        <input
          id="toggle"
          type="checkbox"
          className="hidden"
          checked={enabled}
          onChange={onChange}
        />
        <div className="chatbot-text-primary ml-3 font-medium">
          {label}
        </div>
      </label>
    </div>
  );
};

export default Toggle;
