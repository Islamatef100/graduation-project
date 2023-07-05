import { Button } from "react-bootstrap";

export default function NotFound() {
  const backPage = () => {
    window.history.back()
  }
    return (
      <div  className="d-flex justify-content-center my-5 py-5" style={{height:'80vh'}}>
        <div className="d-flex py-5  my-5 flex-column">
          <h1 style={{color:'red'}}>Error 404</h1>
        <h3 className="py-2"> هذه الصفحه غير موجوده </h3>
        <Button onClick={backPage}>العوده للخلق</Button>
        </div>
        
        </div>
    )
}