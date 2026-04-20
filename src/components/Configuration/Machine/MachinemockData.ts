export type MachineItem = {
    id: number;
    code: string;
    name: string;
    linkedParameterIds: number[];
    isActive: boolean;
  };
  
  export type MachineParameterItem = {
    id: number;
    code: string;
    name: string;
    linkedMachineIds: number[];
    isActive: boolean;
  };
  
  export const machineParameterMockData: MachineParameterItem[] = [
    {
      id: 1,
      code: "MPN-451267",
      name: "ALB2",
      linkedMachineIds: [1, 2, 6, 12],
      isActive: true,
    },
    {
      id: 2,
      code: "MPN-451983",
      name: "BILT3",
      linkedMachineIds: [1, 2, 8],
      isActive: false,
    },
    {
      id: 3,
      code: "MPN-451405",
      name: "ALP2L",
      linkedMachineIds: [1, 3, 4, 9, 13],
      isActive: true,
    },
    {
      id: 4,
      code: "MPN-451739",
      name: "ALT",
      linkedMachineIds: [3, 6],
      isActive: true,
    },
    {
      id: 5,
      code: "MPN-451946",
      name: "AST",
      linkedMachineIds: [4],
      isActive: true,
    },
    {
      id: 6,
      code: "MPN-451604",
      name: "CREA",
      linkedMachineIds: [2, 10],
      isActive: false,
    },
    {
      id: 7,
      code: "MPN-451812",
      name: "UREA",
      linkedMachineIds: [5, 6, 9, 14],
      isActive: false,
    },
    {
      id: 8,
      code: "MPN-451654",
      name: "GLU",
      linkedMachineIds: [7, 8],
      isActive: true,
    },
    {
      id: 9,
      code: "MPN-451820",
      name: "HBA1C",
      linkedMachineIds: [11],
      isActive: true,
    },
    {
      id: 10,
      code: "MPN-451372",
      name: "CRP",
      linkedMachineIds: [3, 8, 12, 15],
      isActive: false,
    },
    {
      id: 11,
      code: "MPN-451258",
      name: "TSH",
      linkedMachineIds: [9, 11, 13, 14, 16],
      isActive: false,
    },
    {
      id: 12,
      code: "MPN-451321",
      name: "FT3",
      linkedMachineIds: [11, 13],
      isActive: true,
    },
    {
      id: 13,
      code: "MPN-451428",
      name: "FT4",
      linkedMachineIds: [11, 14],
      isActive: true,
    },
    {
      id: 14,
      code: "MPN-451506",
      name: "VITD",
      linkedMachineIds: [10, 16],
      isActive: false,
    },
    {
      id: 15,
      code: "MPN-451617",
      name: "CA",
      linkedMachineIds: [5, 15],
      isActive: true,
    },
    {
      id: 16,
      code: "MPN-451772",
      name: "MG",
      linkedMachineIds: [7, 12],
      isActive: false,
    },
  ];
  
  export const machineMockData: MachineItem[] = [
    {
      id: 1,
      code: "MN-041423",
      name: "SIV - COLLAB C311 - Clinical Chemistry",
      linkedParameterIds: [1, 2, 3, 6],
      isActive: false,
    },
    {
      id: 2,
      code: "MN-041428",
      name: "SIV - COLLAB E411 - Immunoassay",
      linkedParameterIds: [1, 2, 6],
      isActive: true,
    },
    {
      id: 3,
      code: "MN-041437",
      name: "PathoTech Analyzer 3000 - Immunoassay System",
      linkedParameterIds: [3, 4, 10, 11, 15],
      isActive: false,
    },
    {
      id: 4,
      code: "MN-041445",
      name: "BioScan E411 - Advanced Immunoassay Machine",
      linkedParameterIds: [3, 5],
      isActive: false,
    },
    {
      id: 5,
      code: "MN-041452",
      name: "ImmunoCheck Pro - E411 Assay Device",
      linkedParameterIds: [7],
      isActive: false,
    },
    {
      id: 6,
      code: "MN-041469",
      name: "ImmunoLab E411 - Precision Assay Instrument",
      linkedParameterIds: [1, 4],
      isActive: true,
    },
    {
      id: 7,
      code: "MN-041476",
      name: "AssayMaster E411 - Immunoassay Platform",
      linkedParameterIds: [8, 16, 15, 7],
      isActive: false,
    },
    {
      id: 8,
      code: "MN-041483",
      name: "ImmunoVision E411 - Diagnostic Assay Machine",
      linkedParameterIds: [2, 8],
      isActive: false,
    },
    {
      id: 9,
      code: "MN-041490",
      name: "PathoScan E411 - Immunoassay Analyzer",
      linkedParameterIds: [3],
      isActive: true,
    },
    {
      id: 10,
      code: "MN-041497",
      name: "ImmunoTech E411 - Comprehensive Assay System",
      linkedParameterIds: [6, 14, 7, 11],
      isActive: false,
    },
    {
      id: 11,
      code: "MN-041504",
      name: "BioAssay E411 - Immunoassay Technology",
      linkedParameterIds: [9, 11, 12, 13, 3],
      isActive: true,
    },
    {
      id: 12,
      code: "MN-041512",
      name: "ChemCore 500 - Clinical Chemistry Unit",
      linkedParameterIds: [1, 10, 16],
      isActive: true,
    },
    {
      id: 13,
      code: "MN-041518",
      name: "ImmunoPrime 920 - Hormone Analyzer",
      linkedParameterIds: [3, 11, 12],
      isActive: false,
    },
    {
      id: 14,
      code: "MN-041526",
      name: "EndoCare E900 - Endocrine System",
      linkedParameterIds: [7, 11, 13],
      isActive: false,
    },
    {
      id: 15,
      code: "MN-041534",
      name: "RapidAssay C220 - Biochemistry Analyzer",
      linkedParameterIds: [10, 15],
      isActive: true,
    },
    {
      id: 16,
      code: "MN-041548",
      name: "NeoPath Dx 800 - Specialty Assay Device",
      linkedParameterIds: [11, 14],
      isActive: false,
    },
  ];