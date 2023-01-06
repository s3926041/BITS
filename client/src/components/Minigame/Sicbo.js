import axios from "axios";
import * as React from "react";
import "./styles.css";
import { toast } from "react-toastify";
import { AuthContext } from "../../helpers/AuthContext";
import HistoryIcon from "@mui/icons-material/History";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from './Table'
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "60%",
  width: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function BasicModal({id}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="mt-5">
      <Button onClick={handleOpen}>
        <span className="font-bold">History</span>
        <HistoryIcon className="text-[40px]"></HistoryIcon>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Table id={id}></Table>
        </Box>
      </Modal>
    </div>
  );
}

export default function Sicbo() {
  const { userGlobal } = React.useContext(AuthContext);
  const { authState, setAuthState } = userGlobal;
  const [option, setOption] = React.useState("");
  const [gold, setGold] = React.useState(1);
  const [dices, setDices] = React.useState([6, 6, 6]);
  const [rolling, setRolling] = React.useState(false);
  const [data, setData] = React.useState({});
  const lowOption = () => {
    setGold(1);
    setOption("low");
  };
  const highOption = () => {
    setGold(1);
    setOption("high");
  };
  const makeSic = async () => {
    if (rolling) return;

    setRolling(true);
    await axios
      .post(
        "http://localhost:5000/api/sicbo/",
        { condition: option, gold: gold },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        let ar = [res.data.dice1, res.data.dice2, res.data.dice3];
        setGold(1);
        setDices(ar);
        setData(res.data);
        resu(res.data);
        setOption("");
      })
      .catch((err) => {
        err2(err.message);
      });
    setRolling(false);
  };
  const resu = (d) => {
    let r = d.result >= 11 ? "high" : "low";
    if (r == d.condition) {
      suc(d.gold);
      setAuthState({
        ...authState,
        gold: parseInt(authState.gold) + parseInt(d.gold),
      });
    } else {
      setAuthState({ ...authState, gold: authState.gold - d.gold });
      return err(d.gold);
    }
  };
  const suc = (g) =>
    toast.success(`🦄 You have won ${parseInt(g)} Gold!`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const err = (g) =>
    toast.error(`🦄 You have lost ${parseInt(g)} Gold!`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const err2 = (err) =>
    toast.error(`🦄 ${err}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  return (
    <div className="w-full  flex flex-col justify-center align-items-center p-10">
      <h1 className="text-[40px]">Double your Gold!</h1>
      <div className="flex mt-10">
        {dices.map((item) => {
          return (
            <img
              src={require(`./img/${item}.png`)}
              className={`w-[100px] m-4 ${rolling ? "shake" : ""}`}
              alt=""
            />
          );
        })}
      </div>
      <div className="mt-10 flex flex-col justify-between md:w-[800px] md:flex-row">
        <div className=" flex flex-col text-center">
          <input
            type="submit"
            value={"=<10"}
            onClick={lowOption}
            className={`h-[50px] bg-indigo-600 w-[200px] text-white rounded-lg  ${
              option === "low" ? "hidden" : ""
            }`}
          />
          <input
            type="number"
            value={gold}
            onChange={(e) => setGold(e.target.value)}
            className={`h-[50px] border-2 rounded-lg ${
              option === "high" || option === "" ? "hidden" : ""
            }`}
          />
        </div>

        <div className="mx-5 flex flex-col text-center">
          {data?.result ? (
            <>
              <button
                onClick={() => {
                  setData({});
                }}
                className="h-[50px] bg-indigo-600 w-[200px] text-white rounded-lg"
              >
                Continue
              </button>
            </>
          ) : (
            <button
              onClick={makeSic}
              className="h-[50px] bg-indigo-600 w-[200px] text-white rounded-lg"
            >
              Confirm bet and Roll
            </button>
          )}
          <BasicModal id={authState._id}></BasicModal>
        </div>

        <div className=" flex flex-col text-center">
          <input
            type="submit"
            value={">=11"}
            onClick={highOption}
            className={`h-[50px] bg-indigo-600 w-[200px] text-white rounded-lg ${
              option === "high" ? "hidden" : ""
            }`}
          />
          <input
            type="number"
            value={gold}
            onChange={(e) => setGold(e.target.value)}
            className={`h-[50px] border-2 rounded-lg ${
              option === "low" || option === "" ? "hidden" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
}
