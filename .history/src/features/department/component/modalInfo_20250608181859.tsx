"use client";

import { Input } from "@/components/ui/input";
import React from "react";
import { useRouter } from "next/navigation";
import { fields } from "../constant";

export default function DepartmentForm({
  closeModal,
}: {
  closeModal?: () => void;
}) {
  const router = useRouter();

  const handleCreate = () => {
    router.push(`/department/${1}`);

    if (closeModal) closeModal();
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 256px)",
          gap: "26px",
          justifyContent: "center",
          marginBottom: 24,
        }}
      >
        {fields.map(({ name, label, type, placeholder }) => (
          <div key={name} style={{ width: 256 }}>
            <label
              htmlFor={name}
              style={{
                display: "block",
                marginBottom: 6,
                marginRight: 8,
                fontWeight: 500,
              }}
            >
              {label}
            </label>
            <Input
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              style={{
                height: 40,
                backgroundColor: "#FFFFFF",
                border: "1px solid #EBEBEB",
                borderRadius: 4,
                padding: "0 12px",
                fontSize: 16,
                boxSizing: "border-box",
              }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleCreate}
        style={{
          width: 500,
          height: 40,
          background: "linear-gradient(90deg, #E06518 0%, #E3802A 100%)",
          border: "none",
          borderRadius: 4,
          color: "white",
          fontWeight: "600",
          fontSize: 16,
          cursor: "pointer",
          display: "block",
          margin: "0 auto",
          userSelect: "none",
        }}
      >
        Create
      </button>
    </div>
  );
}
