import SessionForm from "../components/SessionForm";
import { useParams } from "react-router-dom";
import SessionList from "../components/SessionList";

export default function PracticeDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1 className="font-semibold text-3xl mb-4">Practice Sessions</h1>
      <SessionForm id={id} />
      <br />
      <SessionList routineId={id} />
    </div>
  );
}
