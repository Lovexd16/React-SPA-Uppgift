interface Props {
  setPage: (page: string) => void;
}

function NavBar(props: Props) {
  return (
    <div>
      <button onClick={() => props.setPage("start")}>Start</button>
      <button onClick={() => props.setPage("booking")}>Boka Tid</button>
      <button onClick={() => props.setPage("about")}>Om oss</button>
      <button onClick={() => props.setPage("contact")}>Kontakt</button>
    </div>
  );
}

export default NavBar;
