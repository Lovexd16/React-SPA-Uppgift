interface Props {
  setPage: (page: string) => void;
}

function NavBar(props: Props) {
  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={() => props.setPage("start")}>Start</button>
      <button onClick={() => props.setPage("booking")}>Boka Tid</button>
      <button onClick={() => props.setPage("fooddrinks")}>Mat & Dryck</button>
      <button onClick={() => props.setPage("contact")}>Kontakt</button>
    </div>
  );
}

export default NavBar;
