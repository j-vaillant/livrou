"use client";

import { toast } from "@/components/toast/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const NewReviewFormSchema = z.object({
  review: z.string().min(1, { message: "ne peut être vide" }),
});

const NewReviewForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof NewReviewFormSchema>>({
    resolver: zodResolver(NewReviewFormSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof NewReviewFormSchema>> = async (
    values
  ) => {
    const req = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await req.json();

    toast({ description: data.error ? data.error : data.message });
  };

  return (
    <div className="mx-auto w-[400px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full flex-col">
          <label>Review</label>
          <textarea {...register("review")}></textarea>
          {errors.review && (
            <span className="text-red-500">{errors.review.message}</span>
          )}
          <button type="submit">Publier</button>
        </div>
      </form>
    </div>
  );
};

export default NewReviewForm;
