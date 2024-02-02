import React from 'react'

const FormField = ({ labelName, placeholder, inputType, isTextArea, options = [], value, handleChange, maxLength, min, max, name, }) => {
    const remainingChars = maxLength - value.length;

  return (
    <label className="flex-1 w-full flex flex-col mt-[30px]">
      {labelName && (
        <span className="text-[14px] leading-[22px] text-[gray] mb-[10px]">{labelName}</span>
      )}
      {isTextArea ? (
        <>
        <textarea 
          required
          value={value}
          onChange={handleChange}
          rows={10}
          maxLength={maxLength}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[0px] bg-[#fafafa] font-epilogue text-black text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] h-[120px] resize-none"
          name={name}
       />
        <div className="text-[14px] text-[gray]">
            {`${remainingChars} characters left`}
        </div>
        </>
      ) : inputType === 'select' ? (
        <select 
          required
          value={value}
          onChange={handleChange}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[0px] border-[#3a3a43] bg-[#fafafa] font-epilogue text-black text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
          name={name}
        >
          <option value="">{placeholder}</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[0px] border-[#3a3a43] bg-[#fafafa] font-epilogue text-black text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
          name={name}
          min={min} // Apply min prop here
          max={max} // Apply max prop here
        />
      )}
    </label>
  )
}

export default FormField
