const Dropdown = ({ fieldId, label, options, value, onSelect }) => {
  return (
    <div className="relative inline-block w-full text-gray-700">
      {label && (
        <label htmlFor={fieldId} className="chatbot-text-primary block text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={fieldId}
          value={value}
          onChange={(e) => onSelect(e.target.value)}
          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500"
        >
          {options.map((option, idx) => (
            <option key={idx} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M5.3 7.7a1 1 0 011.4 0l3.3 3.3 3.3-3.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
