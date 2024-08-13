import { debounce } from "lodash";
import { useCallback } from "react";

function Searchbar(props) {
  const { searchText, setSearchTerm } = props;
  function handleSearchedTermChange(e) {
    e.preventDefault();
    setSearchTerm(e.target.value?.trim());
  }

  const debouncedHandleSearchedString = useCallback(
    debounce(handleSearchedTermChange, 800),
    []
  );

  return (
    <div>
      <input
        type="text"
        className="w-full p-1 font-mono tracking-wider text-xl md:text-3xl	text-black font-bold"
        onChange={debouncedHandleSearchedString}
        placeholder="Search."
        style={{
          background: "transparent",
          outline: "none",
        }}
      ></input>
    </div>
  );
}

export default Searchbar;
