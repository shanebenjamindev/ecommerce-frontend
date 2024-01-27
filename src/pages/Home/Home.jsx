import { useDispatch, useSelector } from "react-redux"
import { decrement, increment } from "../../redux/slides/counterSlide";

export default function Home() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(increment())}>tang</button>
      <div>{count}</div>
      <button onClick={() => dispatch(decrement())}>giam</button>
    </div>
  )
}
