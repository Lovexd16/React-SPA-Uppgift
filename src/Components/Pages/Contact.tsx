function Contact() {
  return (
    //Använder span för jag vill ändra just det ordet i p tagen med css
    <div>
      <h2>Kontakta oss!</h2>
      <div className="pageText">
        <p>
          <span>Besöksadress:</span> Vägvägen 23 Stockholm
        </p>
        <p>
          <span>Mejladress:</span> divinerelaxation@hotmail.com
        </p>
        <p>
          <span>Telefon:</span> 123 456 67
        </p>
      </div>
    </div>
  );
}

export default Contact;
