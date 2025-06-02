"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type {  ValueGetterParams } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry, ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { ClientSideRowModelModule, CsvExportModule } from "ag-grid-community";
//import { themeBalham } from "ag-grid-community";
// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

// import { columns, type Problem } from "./columns"
// import { DataTable } from "@/components/shared/data-table"

import { themeQuartz, iconSetQuartzBold } from "ag-grid-community";

// to use myTheme in an application, pass it to the theme grid option
const myTheme = themeQuartz.withPart(iconSetQuartzBold).withParams({
  accentColor: "#00A6FF",
  backgroundColor: "#0A0A0C",
  browserColorScheme: "dark",
  foregroundColor: "#FFFFFF",
  chromeBackgroundColor: {
    ref: "foregroundColor",
    mix: 0.07,
    onto: "backgroundColor",
  },
  fontFamily: {
    googleFont: "IBM Plex Sans",
  },
  headerFontSize: 14,
  spacing: 12,
  borderRadius: 8,
});
interface Problem {
      make: string;
      model: string;
      price: number;
      electric: boolean;
      status: string;
    }
interface ProblemClientProps {
  data: Problem[];
  isAdmin: boolean;
}
// interface Column {
//       headerName: string;
//       valueGetter: string |unknown;
//       flex: number;
//       filter: boolean;
//       cellRenderer: (params: { value: string }) => React.JSX.Element;
//     }
const CustomButtonComponent = () => {
  return <button onClick={() => console.log("clicked")}>Push Me!</button>;
};

export const ProblemClient: React.FC<ProblemClientProps> = ({
  data,
  isAdmin,
}) => {
  console.log(data);
  const [isMounted, setIsMounted] = useState(false);
  const [rowData /*, setRowData*/] = useState([
    {
      make: "Tesla",
      model: "Model Y",
      price: 64950,
      electric: true,
      status: "completed",
    },
    {
      make: "Ford",
      model: "F-Series",
      price: 33850,
      electric: false,
      status: "completed",
    },
    {
      make: "Toyota",
      model: "Corolla",
      price: 29600,
      electric: false,
      status: "incompleted",
    },
    {
      make: "Mercedes",
      model: "EQA",
      price: 48890,
      electric: true,
      status: "completed",
    },
    {
      make: "Fiat",
      model: "500",
      price: 15774,
      electric: false,
      status: "incompleted",
    },
    {
      make: "Nissan",
      model: "Juke",
      price: 20675,
      electric: false,
      status: "incompleted",
    },
  ]);
  const [columnDefs /*, setColumnDefs*/] = useState<ColDef<Problem>[]>([
    {
      headerName: "Make & Model",
      valueGetter: (p: ValueGetterParams<Problem>) => p?.data?.make + " " + p?.data?.model,
      flex: 2,
      filter: true,
    },
    {
      field: "price",
      valueFormatter: (p) => "£" + Math.floor((p.value as number) ?? 0).toLocaleString(),
      flex: 1,
    },
    { field: "electric", flex: 1 },
    { headerName: "Action", cellRenderer: CustomButtonComponent as React.ComponentType, flex: 1 },
    {
      headerName: "Status",
      filter: true,
      floatingFilter: true,
      field: "status",
      cellRenderer: (params: { value: string }) => {
        const statusClassMap: Record<string, string> = {
          completed: "bg-green-600 text-white capitalize",
          "In Progress": "bg-yellow-500 text-black",
          incompleted: "bg-red-600 text-white capitalize",
        };

        const badgeClass =
          statusClassMap[params.value] || "bg-gray-600 text-white";
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeClass}`}
          >
            {params.value}
          </span>
        );
      },
    },
  ]);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const pagination = true;
  const paginationPageSize = 500;
  const paginationPageSizeSelector = [200, 500, 1000];
  return (
    <div className="space-y-8">
      {isAdmin && (
        <div className="flex justify-end">
          <Link href="/problems/add">
            <Button>Create Problem</Button>
          </Link>
        </div>
      )}

      {/* <div>
        <h1 className="text-2xl font-bold mb-6">Problem Set</h1>
        <DataTable columns={columns} data={data} />
      </div> */}
      <div className="w-full h-auto">
        <AgGridReact
          domLayout="autoHeight"
          theme={myTheme}
          rowData={rowData}
          columnDefs={columnDefs}
          // Pass Modules to this individual grid
          modules={[ClientSideRowModelModule, CsvExportModule]}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
};
