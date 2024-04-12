interface Props {
  setPage: (page: string) => void;
}

function NavBar(props: Props) {
  return (
    <div className="navbar">
      {/*En knapp för varje sida med en onClick, som gör att när man klickar på knappen så tas man till rätt sida*/}
      <button onClick={() => props.setPage("start")}>Start</button>
      <button onClick={() => props.setPage("booking")}>Boka tid</button>
      <button onClick={() => props.setPage("fooddrinks")}>Mat & dryck</button>
      <button onClick={() => props.setPage("contact")}>Kontakt</button>
    </div>
  );
}

export default NavBar;
