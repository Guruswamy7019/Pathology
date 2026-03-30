export type SampleTubeItem = {
  id: number;
  code: string;
  name: string;
  isActive: boolean;
};

export const sampleMockData: SampleTubeItem[] = [
  { id: 1, code: "SN-041421", name: "Whole Blood", isActive: false },
  { id: 2, code: "SN-041422", name: "Urine", isActive: true },
  { id: 3, code: "SN-041423", name: "Blood", isActive: false },
  { id: 4, code: "SN-041424", name: "Saliva", isActive: false },
  { id: 5, code: "SN-041425", name: "Tissue Biopsy", isActive: false },
  { id: 6, code: "SN-041426", name: "Sputum", isActive: true },
  { id: 7, code: "SN-041427", name: "Cerebrospinal Fluid", isActive: false },
  { id: 8, code: "SN-041428", name: "Fecal Sample", isActive: false },
  { id: 9, code: "SN-041429", name: "Urine", isActive: true },
  { id: 10, code: "SN-041430", name: "Nail Clippings", isActive: false },
  { id: 11, code: "SN-041431", name: "Hair Sample", isActive: true },
  { id: 12, code: "SN-041432", name: "Plasma", isActive: false },
  { id: 13, code: "SN-041433", name: "Serum", isActive: true },
  { id: 14, code: "SN-041434", name: "Synovial Fluid", isActive: false },
  { id: 15, code: "SN-041435", name: "Pus", isActive: false },
  { id: 16, code: "SN-041436", name: "Pleural Fluid", isActive: true },
];

export const tubeMockData: SampleTubeItem[] = [
  { id: 101, code: "TB-1001", name: "EDTA Lavender", isActive: true },
  { id: 102, code: "TB-1002", name: "Sodium Citrate Blue", isActive: true },
  { id: 103, code: "TB-1003", name: "Serum Separator Yellow", isActive: true },
  { id: 104, code: "TB-1004", name: "Heparin Green", isActive: false },
  { id: 105, code: "TB-1005", name: "Fluoride Grey", isActive: true },
  { id: 106, code: "TB-1006", name: "Plain Red", isActive: false },
  { id: 107, code: "TB-1007", name: "Microtainer Purple", isActive: true },
  { id: 108, code: "TB-1008", name: "Urine Culture Tube", isActive: false },
  { id: 109, code: "TB-1009", name: "PAXgene RNA", isActive: true },
  {
    id: 110,
    code: "TB-1010",
    name: "Trace Element Royal Blue",
    isActive: false,
  },
  { id: 111, code: "TB-1011", name: "ESR Black", isActive: false },
  { id: 112, code: "TB-1012", name: "Pediatric Capillary", isActive: true },
];
