import { useMemo, useState } from "react";
import MachineCreate, { type MachineFormPayload } from "./MachineCreate";
import MachineList from "./MachineList";
import {
  machineMockData,
  machineParameterMockData,
  type MachineItem,
  type MachineParameterItem,
} from "./MachinemockData";
import ParameterCreate, { type ParameterFormPayload } from "./ParameterCreate";
import ParameterList from "./ParameterList";

type ActiveTab = "machine" | "parameter";

const tabs: { key: ActiveTab; label: string }[] = [
  { key: "machine", label: "Machine" },
  { key: "parameter", label: "Machine-Parameters" },
];

function getNextId(items: { id: number }[]) {
  return items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

function MachineDashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("machine");
  const [machines, setMachines] = useState<MachineItem[]>(machineMockData);
  const [parameters, setParameters] = useState<MachineParameterItem[]>(
    machineParameterMockData,
  );

  const [machineModal, setMachineModal] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    value: MachineItem | null;
  }>({ isOpen: false, mode: "create", value: null });

  const [parameterModal, setParameterModal] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    value: MachineParameterItem | null;
  }>({ isOpen: false, mode: "create", value: null });

  const parameterOptions = useMemo(
    () =>
      parameters.map((parameter) => ({
        id: parameter.id,
        name: parameter.name,
      })),
    [parameters],
  );

  const machineOptions = useMemo(
    () => machines.map((machine) => ({ id: machine.id, name: machine.name })),
    [machines],
  );

  const closeMachineModal = () =>
    setMachineModal({ isOpen: false, mode: "create", value: null });

  const closeParameterModal = () =>
    setParameterModal({ isOpen: false, mode: "create", value: null });

  const handleSaveMachine = (payload: MachineFormPayload) => {
    const editingMachine =
      machineModal.mode === "edit" ? machineModal.value : null;
    const machineId = editingMachine ? editingMachine.id : getNextId(machines);

    const nextMachines = editingMachine
      ? machines.map((machine) =>
          machine.id === machineId
            ? {
                ...machine,
                code: payload.code,
                name: payload.name,
                linkedParameterIds: payload.linkedParameterIds,
              }
            : machine,
        )
      : [
          ...machines,
          {
            id: machineId,
            code: payload.code,
            name: payload.name,
            linkedParameterIds: payload.linkedParameterIds,
            isActive: true,
          },
        ];

    setMachines(nextMachines);
    setParameters((prev) =>
      prev.map((parameter) => ({
        ...parameter,
        linkedMachineIds: nextMachines
          .filter((machine) =>
            machine.linkedParameterIds.includes(parameter.id),
          )
          .map((machine) => machine.id),
      })),
    );

    closeMachineModal();
  };

  const handleSaveParameter = (payload: ParameterFormPayload) => {
    const editingParameter =
      parameterModal.mode === "edit" ? parameterModal.value : null;
    const parameterId = editingParameter
      ? editingParameter.id
      : getNextId(parameters);

    const nextParameters = editingParameter
      ? parameters.map((parameter) =>
          parameter.id === parameterId
            ? {
                ...parameter,
                code: payload.code,
                name: payload.name,
                linkedMachineIds: payload.linkedMachineIds,
              }
            : parameter,
        )
      : [
          ...parameters,
          {
            id: parameterId,
            code: payload.code,
            name: payload.name,
            linkedMachineIds: payload.linkedMachineIds,
            isActive: true,
          },
        ];

    setParameters(nextParameters);
    setMachines((prev) =>
      prev.map((machine) => ({
        ...machine,
        linkedParameterIds: nextParameters
          .filter((parameter) =>
            parameter.linkedMachineIds.includes(machine.id),
          )
          .map((parameter) => parameter.id),
      })),
    );

    closeParameterModal();
  };

  return (
    <section
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e8ebf0",
        borderRadius: "14px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: 0,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderBottom: "1px solid #edf0f4",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            style={{
              height: "50px",
              border: "none",
              backgroundColor: "#ffffff",
              borderBottom:
                activeTab === tab.key
                  ? "2px solid #f06d4f"
                  : "2px solid transparent",
              fontSize: "18px",
              fontWeight: 600,
              color: activeTab === tab.key ? "#2f343c" : "#a1a7b1",
              cursor: "pointer",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, minHeight: 0 }}>
        {activeTab === "machine" ? (
          <MachineList
            rows={machines}
            onAdd={() =>
              setMachineModal({ isOpen: true, mode: "create", value: null })
            }
            onEdit={(row) =>
              setMachineModal({ isOpen: true, mode: "edit", value: row })
            }
            onToggleStatus={(id) =>
              setMachines((prev) =>
                prev.map((machine) =>
                  machine.id === id
                    ? { ...machine, isActive: !machine.isActive }
                    : machine,
                ),
              )
            }
          />
        ) : (
          <ParameterList
            rows={parameters}
            onAdd={() =>
              setParameterModal({ isOpen: true, mode: "create", value: null })
            }
            onEdit={(row) =>
              setParameterModal({ isOpen: true, mode: "edit", value: row })
            }
            onToggleStatus={(id) =>
              setParameters((prev) =>
                prev.map((parameter) =>
                  parameter.id === id
                    ? { ...parameter, isActive: !parameter.isActive }
                    : parameter,
                ),
              )
            }
          />
        )}
      </div>

      <MachineCreate
        isOpen={machineModal.isOpen}
        mode={machineModal.mode}
        initialValue={machineModal.value}
        parameterOptions={parameterOptions}
        onClose={closeMachineModal}
        onSave={handleSaveMachine}
      />

      <ParameterCreate
        isOpen={parameterModal.isOpen}
        mode={parameterModal.mode}
        initialValue={parameterModal.value}
        machineOptions={machineOptions}
        onClose={closeParameterModal}
        onSave={handleSaveParameter}
      />
    </section>
  );
}

export default MachineDashboard;
