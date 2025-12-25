import { useMutation } from "@tanstack/react-query";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  productSchema,
  type ProductFormValues,
} from "@/schemas/product.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Simulated API request
 */
function createProduct(data: ProductFormValues) {
  return new Promise<ProductFormValues>((resolve) => {
    setTimeout(() => {
      console.log("Product created:", data);
      resolve(data);
    }, 1000);
  });
}

export default function ProductsNew() {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      category: "",
      price: 0,
      stock: 0,
      description: "",
    },
  });

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      form.reset();
      alert("Product added successfully");
    },
  });

  const onSubmit: SubmitHandler<ProductFormValues> = (values) => {
    mutation.mutate(values);
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Add Product</h1>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Product Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Product Name</label>
          <Input {...form.register("title")} placeholder="Product Name" />
          <p className="text-sm text-red-500">
            {form.formState.errors.title?.message}
          </p>
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Category</label>
          <Controller
            control={form.control}
            name="category"
            render={({ field }) => (
              <div>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="smartphones">Smartphones</SelectItem>
                    <SelectItem value="laptops">Laptops</SelectItem>
                    <SelectItem value="fragrances">Fragrances</SelectItem>
                    <SelectItem value="skincare">Skincare</SelectItem>
                  </SelectContent>
                </Select>

                <p className="text-sm text-red-500">
                  {form.formState.errors.category?.message}
                </p>
              </div>
            )}
          />
        </div>

        {/* Price */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Price</label>
          <Input
            type="number"
            placeholder="Price"
            {...form.register("price", {
              valueAsNumber: true,
            })}
          />
          <p className="text-sm text-red-500">
            {form.formState.errors.price?.message}
          </p>
        </div>

        {/* Stock */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Stock</label>
          <Input
            type="number"
            placeholder="Stock"
            {...form.register("stock", {
              valueAsNumber: true,
            })}
          />
          <p className="text-sm text-red-500">
            {form.formState.errors.stock?.message}
          </p>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            placeholder="Product description"
            {...form.register("description")}
          />
          <p className="text-sm text-red-500">
            {form.formState.errors.description?.message}
          </p>
        </div>

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Saving..." : "Add Product"}
        </Button>
      </form>
    </div>
  );
}
