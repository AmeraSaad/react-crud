const WarningMSG = ({searchFailed}) => {
  const message = searchFailed
  ? "No products match your search query."
  : "There are no products yet";
  return (
    <div id="warning-msg" className="w-75 mx-auto my-5">
        <div className="alert alert-warning" role="alert">
          {message}
        </div>
    </div>
  )
}

export default WarningMSG
