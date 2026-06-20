import React, { useState } from 'react'
import { useFormContext } from "react-hook-form";
import { Input } from '../ui';
import { getValueByKey } from '../../lib/getValueByKey';
import { HelpText } from './help-text';
import { VscEye, VscEyeClosed } from "react-icons/vsc";

export const InputField = ({
    name,
    label,
    type,
    placeholder,
    required = false,
    disabled = false,
    helpText,
}) => {
    const {
        register,
        formState: { errors, disabled: formDisabled },
        watch,
        setValue,
    } = useFormContext(); // *Access the react-hook-form context

    const error = getValueByKey(errors, name);
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === "password";
    const handleToggle = () => setShowPassword((prev) => !prev);
    return (
        <div className='mb-4'>
            <div className='relative'>
                {
                    label && (
                        <label className="font-normal text-md text-[#646464] mb-2 block">
                            {label}
                            {/* {required && <span className="text-destructive ml-1">*</span>} */}
                            {required && <span className="ml-1">*</span>}
                        </label>
                    )
                }
                <Input
                    type={isPasswordType ? (showPassword ? "text" : "password") : type}
                    autoComplete="false"
                    className="border border-[#DEE2E6]"
                    placeholder={placeholder}
                    disabled={disabled || formDisabled}
                    defaultValue={watch(name)}
                    {...register(name, { required, valueAsNumber: type === "string" })}
                />
                {isPasswordType && (
                    <span
                        onClick={handleToggle}
                        className="cursor-pointer absolute right-2.5 bottom-2.5"
                    >
                        {showPassword ? <VscEyeClosed /> : <VscEye />}
                    </span>
                )}
            </div>
            {(error || helpText) && (
                <HelpText error={!!error}>
                    {error && (
                        <span className="flex items-center mt-2">
                            {/* <CircleAlert fill="#FF0000" color="#FFFFFF" size={18} className="mr-1"  /> */}
                            {error ? error?.message : helpText}
                        </span>
                    )}
                </HelpText>
            )}
        </div>
    )
}
