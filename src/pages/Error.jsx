import { Button } from "react-bootstrap";

export default function NotFound() {
  const backPage = () => {
    window.history.back()
  }
    return (
      <div  className="d-flex justify-content-center my-5 py-5">
        <div>
          <h1 style={{color:'red'}}>Error 404</h1>
        <h3>we can't find this page</h3>
        <Button onClick={backPage}>العوده للخلق</Button>
        </div>
        
        </div>
    )
}