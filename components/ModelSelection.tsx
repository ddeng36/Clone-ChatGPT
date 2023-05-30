import React from "react";
import Select from "react-select";
import useSWR from "swr";
const options = [{}];
function fetchModels() {
  return fetch(`/api/queryModels`).then((res) => res.json());
}
const ModelSelection = () => {
  const { data: models, isLoading } = useSWR(`models`, fetchModels);
  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });
  return (
    <div>
      <Select
        className="mt-2"
        classNames={{
          control: (state) =>
            "bg-[#434654] border-[#434654] text-white border-2 rounded-lg",
        }}
        id="model-select"
        isSearchable
        isLoading={isLoading}
        menuPosition="fixed"
        defaultValue={model}
        placeholder={model}
        options={models?.modelOptions}
        onChange={(e) => setModel(e.value)}
      ></Select>
    </div>
  );
};

export default ModelSelection;
