



const FormField = ({ label, name, value, placeholder, onChange, onBlur, type = 'text', error }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      className={`w-full p-3 border ${
        error ? 'border-red-500' : 'border-gray-300'
      } rounded-md focus:outline-none focus:ring-2 ${
        error ? 'focus:ring-red-500' : 'focus:ring-[#12666F]'
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default FormField