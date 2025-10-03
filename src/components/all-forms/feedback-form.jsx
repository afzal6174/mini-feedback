"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Form,
  FormDescription,
  FormError,
  FormTitle,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FeedbackForm = () => {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  return (
    <Card className="max-w-xl mx-auto">
      {!success ? (
        <Form
          name="feedback-form"
          action="/api/feedback"
          onSuccess={() => {
            setSuccess(true);
            router.refresh();
          }}
        >
          {(form) => {
            useEffect(() => {
              if (success) form.reset();
            }, [success]);
            return (
              <>
                <CardHeader>
                  <FormTitle className="large">Share Your Feedback</FormTitle>
                  <FormDescription className="medium">
                    We’d love to hear from you! Fill out the form below and let
                    us know what you think.
                  </FormDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-col gap-6">
                    <Field
                      name="name"
                      rules={{
                        required: "Your name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      }}
                    >
                      {({ field, accessibility }) => (
                        <>
                          <FieldLabel className="medium">Name</FieldLabel>
                          <FieldDescription className="text-muted-foreground">
                            Write your full name.
                          </FieldDescription>
                          <Input
                            {...field}
                            {...accessibility}
                            disabled={form.formState.isSubmitting}
                            placeholder="John Doe"
                          />
                          <FieldError className="small" />
                        </>
                      )}
                    </Field>

                    <Field
                      name="email"
                      rules={{
                        required: "Your email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Please enter a valid email address",
                        },
                      }}
                    >
                      {({ field, accessibility }) => (
                        <>
                          <FieldLabel className="medium">Email</FieldLabel>
                          <FieldDescription className="text-muted-foreground">
                            Write your email address.
                          </FieldDescription>
                          <Input
                            {...field}
                            {...accessibility}
                            disabled={form.formState.isSubmitting}
                            placeholder="example@email.com"
                          />
                          <FieldError className="small" />
                        </>
                      )}
                    </Field>

                    <Field
                      name="feedback"
                      rules={{
                        required: "Feedback is required.",
                        minLength: {
                          value: 3,
                          message: "Must be at least 3 characters",
                        },
                      }}
                    >
                      {({ field, accessibility }) => (
                        <>
                          <FieldLabel className="medium">
                            What&rsquo;s on your mind
                          </FieldLabel>
                          <FieldDescription>
                            Please share your thoughts, suggestions, or
                            concerns. Your feedback helps us improve.
                          </FieldDescription>
                          <Textarea
                            {...field}
                            {...accessibility}
                            rows={3}
                            disabled={form.formState.isSubmitting}
                            placeholder="Share your feedback here..."
                            className="min-h-auto"
                          />
                          <FieldError className="small" />
                        </>
                      )}
                    </Field>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button
                    disabled={
                      form.formState.isSubmitting || !form.formState.isValid
                    }
                    className="self-end"
                  >
                    {form.formState.isSubmitting ? "Submitting..." : "Submit"}
                  </Button>

                  <FormError className="self-start" />
                </CardFooter>
              </>
            );
          }}
        </Form>
      ) : (
        <CardContent className="flex h-full flex-col items-center justify-center">
          <p className="text-center">
            Thanks for sharing your thoughts! <br /> Your feedback helps us grow
            and get better.
          </p>
          <Button className="mt-4" onClick={() => setSuccess(false)}>
            Back to Form
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default FeedbackForm;
