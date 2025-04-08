import { Control, Controller, FieldError } from "react-hook-form";
import Password from "./Password";

interface FormItemType {
  id?: string;
  formType?: "input" | "textarea" | "password";
  fieldName?: string | undefined;
  validator?: any;
  label?: string;
  placeholder?: string;
  type?: string;
  name?: string;
  className?: string;
  groupWith?: number;
  isGrouped?: boolean;
}

interface FormProps {
  formList: FormItemType[];
  control: Control<any>;
  errors: Record<string, FieldError | undefined>;
  loading: boolean;
}

const Form: React.FC<FormProps> = ({ formList, control, errors, loading }) => {
  const renderField = (
    item: FormItemType,
    field: { value: any; onChange: (e: any) => void },
    error?: FieldError
  ) => {
    const errorClass = error ? "border-red-500" : "border-blue-800";

    switch (item.formType) {
      case "input":
        return (
          <input
            id={item.id}
            type={item.type || "text"}
            name={item.name || ""}
            value={field.value ?? ""}
            onChange={field.onChange}
            className={`input ${errorClass}`}
            placeholder={item.placeholder}
          />
        );
      case "password":
        return (
          <Password
            id={item.id}
            name={item.name || ""}
            value={field.value ?? ""}
            handleChange={field.onChange}
            className={`input ${errorClass}`}
            placeholder={item.placeholder}
          />
        );
      case "textarea":
        return (
          <textarea
            id={item.id}
            name={item.name || ""}
            value={field.value ?? ""}
            onChange={field.onChange}
            className={`input ${errorClass} resize-none !h-auto !min-h-[100px] `}
            placeholder={item.placeholder}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      {formList.map((item, index) => {
        const isGrouped = item?.isGrouped && formList[index + 1];
        if (isGrouped) {
          return (
            <div className={`  ${item?.className} `} key={item.id}>
              {[item, formList[index + 1]].map((fieldItem) => (
                <fieldset
                  className={`flex flex-col gap-2  text-base capitalize `}
                  key={fieldItem.id}
                >
                  <label htmlFor={fieldItem?.id}>{fieldItem?.label}</label>
                  <Controller
                    name={fieldItem.fieldName}
                    control={control}
                    rules={fieldItem.validator}
                    render={({ field, fieldState: { error } }) =>
                      renderField(fieldItem, field, error)
                    }
                  />
                  {errors[fieldItem?.fieldName] && (
                    <p className="text-red-600 text-xs">
                      {errors[fieldItem?.fieldName]?.message}
                    </p>
                  )}
                </fieldset>
              ))}
            </div>
          );
        } else if (item && !item?.isGrouped && !item?.groupWith) {
          return (
            <fieldset
              className={`grid gap-2 text-base capitalize ${item?.className} col-span-2`}
              key={item.id}
            >
              <label htmlFor={item?.id}>{item?.label}</label>
              <Controller
                name={item?.fieldName}
                control={control}
                rules={item?.validator}
                render={({ field, fieldState: { error } }) =>
                  renderField(item, field, error)
                }
              />
              {errors[item?.fieldName] && (
                <p className="text-red-600 text-xs">
                  {errors[item?.fieldName]?.message}
                </p>
              )}
            </fieldset>
          );
        } else {
          return null;
        }
      })}
    </>
  );
};

export default Form;
