"use client";

import { cn } from "@/lib/utils/tailwind";
import { CircleAlert } from "lucide-react";
import * as React from "react";
import { FormProvider, Form as RHForm, useForm } from "react-hook-form";

const FormContext = React.createContext(null);

const useFormContext = () => {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a Form");
  }
  return context;
};

const Form = ({ name: formName, options, children, className, ...props }) => {
  if (!formName) {
    throw new Error("Form 'name' prop is required");
  }
  const form = useForm({
    mode: "onTouched",
    ...options,
  });

  return (
    <FormProvider {...form}>
      <FormContext.Provider value={{ formName, ...form }}>
        <RHForm
          data-slot="form"
          name={formName}
          control={form.control}
          aria-labelledby={`${formName}-title`}
          aria-describedby={`${formName}-description`}
          className={cn("flex flex-col gap-6", className)}
          {...props}
        >
          {typeof children === "function" ? children(form) : children}
        </RHForm>
      </FormContext.Provider>
    </FormProvider>
  );
};

function FormTitle({ className, ...props }) {
  const { formName, formState } = useFormContext();

  return (
    <h2
      data-slot="form-title"
      data-error={!!Object.keys(formState.errors).length}
      className={cn(
        "data-[error=true]:text-destructive leading-none font-semibold",
        className
      )}
      id={`${formName}-title`}
      {...props}
    />
  );
}

function FormDescription({ className, ...props }) {
  const { formName } = useFormContext();
  return (
    <p
      data-slot="form-description"
      id={`${formName}-description`}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function FormError({ className, children, ...props }) {
  const {
    formName,
    formState: {
      errors: { root: error },
    },
  } = useFormContext();

  if (!error) return;
  const child = typeof children === "function" ? children(error) : children;
  const body = child ?? (
    <>
      <CircleAlert />
      {String(error?.message ?? "Something went wrong!")}
    </>
  );

  return (
    <p
      data-slot="form-message"
      id={`${formName}-message`}
      className={cn("text-sm text-destructive flex gap-2", className)}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      {...props}
    >
      {body}
    </p>
  );
}

export { Form, FormDescription, FormError, FormTitle, useFormContext };
