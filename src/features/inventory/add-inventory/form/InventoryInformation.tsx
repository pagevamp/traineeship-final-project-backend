import React from "react";
import { ImageIcon, PlusCircle, Upload } from "lucide-react";
import { Selectbox } from "@/components/ui/select-box";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import RichTextEditor from "@/components/richTextEditor/RichTextEditor";

const InventoryInformation = (props: any) => {
  const { control, setValue, content, setContent } = props;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Basic Information */}
      <div className="lg:col-span-1">
        <h2 className="text-base font-secondary font-semibold mb-6">
          Information
        </h2>
        <div className="space-y-4">
          <Input
            labelName="Product name"
            placeholder="Enter Product Name"
            className="bg-white"
            type="text"
            name={"productName"}
            maxLength={50}
            required
          />
          <div>
            <Controller
              name="unitOfMeasure"
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <Selectbox
                    options={[{ label: "2 * 3", value: "2 * 3" }]}
                    value={field.value}
                    onChange={(value) => {
                      setValue("unitOfMeasure", value?.value);
                    }}
                    placeholder="Select Unit of measures"
                    emptyText="No data found."
                    className="w-full bg-transparent h-12"
                    label="Unit of measures"
                  />
                );
              }}
            />
          </div>
          <div>
            <Controller
              name="categories"
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <Selectbox
                    options={[{ label: "Category", value: "Categories" }]}
                    value={field.value}
                    onChange={(value) => {
                      setValue("categories", value?.value);
                    }}
                    placeholder="Select Categories"
                    emptyText="No data found."
                    className="w-full bg-transparent h-12"
                    label="Categories"
                  />
                );
              }}
            />
          </div>
          <div>
            <Controller
              name="type"
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <Selectbox
                    options={[{ label: "Types", value: "Types" }]}
                    value={field.value}
                    onChange={(value) => {
                      setValue("types", value?.value);
                    }}
                    placeholder="Select Types"
                    emptyText="No data found."
                    className="w-full bg-transparent h-12"
                    label="Types"
                  />
                );
              }}
            />
          </div>
        </div>
      </div>

      {/* Middle Column - Descriptions */}
      <div className="lg:col-span-1">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-base font-semibold font-secondary">
              Product Short Description <span className="text-red-600">*</span>
            </label>
            <div
              className={cn(
                "border rounded-sm break-all max-h-[60vh] overflow-auto"
                // errors?.content?.message && "border-destructive"
              )}
            >
              <RichTextEditor
                content={content}
                onChange={(newContent) => {
                  setContent(newContent);
                  setValue("content", newContent);
                  // trigger("content");
                }}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-base font-semibold font-secondary">
              Product Long Description <span className="text-red-600">*</span>
            </label>
            <div
              className={cn(
                "border rounded-sm break-all max-h-[60vh] overflow-auto"
              )}
            >
              <RichTextEditor
                content={content}
                onChange={(newContent) => {
                  setContent(newContent);
                  setValue("content", newContent);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Images */}
      <div className="lg:col-span-1">
        <div>
          <div className="flex items-center justify-between flex-wrap mb-2">
            <label className="block mb-2 text-base font-semibold font-secondary">
              Cover Image <span className="text-red-600">*</span>
            </label>
            <Button variant="outline" className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Sales Flyer
            </Button>
          </div>

          <div
            className={cn(
              "border-2 border-dashed rounded-md flex flex-col items-center border-gray-200 justify-center p-6 transition-colors"
            )}
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="rounded-full bg-gray-100 p-3">
                <ImageIcon className="h-6 w-6 text-gray-500" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-sm font-medium font-primary">
                  {"Upload Image"}
                </p>

                <p className="text-xs text-gray-500 font-secondary font-[300]">
                  {"Upload a cover image for your product."}
                </p>
              </div>
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="flex items-center gap-1 rounded-md bg-primary hover:opacity-80 px-3 py-1.5 text-xs font-medium text-primary-foreground">
                  <Upload className="h-3 w-3" />
                  <span>Upload</span>
                </div>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  // onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center group mt-4">
            <div className="flex flex-col items-center justify-center gap-2 group-hover:opacity-80">
              <Upload className="h-10 w-10 text-gray-400" />
              <p className="text-sm text-gray-500">Upload More Image</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryInformation;
