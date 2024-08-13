function Tags(props) {
  const { tags } = props;
  return (
    tags.length > 0 && (
      <div className=" flex flex-row flex-wrap  items-center gap-3">
        {tags.map((tag, key) => {
          return (
            <p
              key={key}
              className="text-[#363636] font-mono font-medium text-xs shadow-md   px-4 py-1 rounded-xl "
            >
              {tag}
            </p>
          );
        })}
      </div>
    )
  );
}

export default Tags;
