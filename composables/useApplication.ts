import { ApplicationState, Block } from "~/types";

export const useApplication = () => {
  const state = useState("application_state", () => "editor");

  const { setBlocks } = usePreview();

  const setState = (value: ApplicationState, blocks?: Array<Block>) => {
    state.value = value;
    setBlocks(blocks ?? []);
  };

  return { state, setState };
};
