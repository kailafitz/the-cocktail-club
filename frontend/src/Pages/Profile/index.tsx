import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Typography from "@mui/material/Typography";
import ViewHeightContainer from "../../Components/Layout/ViewHeightContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Loading from "../../Components/Status/Loading";
import { useNavigate } from "react-router-dom";
import EditBio from "../../Components/EditBio";
import Error from "../../Components/Status/Error";

const Profile = () => {
  const navigate = useNavigate();
  const { data, status } = useQuery(["Get Account Details"], () =>
    axios
      .get("/api/profile", {
        withCredentials: true,
      })
      .then((res) => {
        // console.log("res", res.data);
        return res.data;
      })
  );

  if (status === "loading") {
    return (
      <ViewHeightContainer center>
        <Loading color="light" />
      </ViewHeightContainer>
    );
  }

  if (status === "error") {
    return (
      <ViewHeightContainer center>
        <Error message="Something went wrong!" />
      </ViewHeightContainer>
    );
  }

  return (
    <ViewHeightContainer pt>
      <Typography
        variant="pageHeading"
        sx={{
          fontSize: { lg: "6rem" },
        }}
      >
        My Profile
      </Typography>
      <TableContainer sx={{ width: { md: "50%", lg: "50%" }, m: "0 auto" }}>
        <Table aria-label="profile table">
          <TableBody>
            <TableRow
              key={data.name}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell>Name</TableCell>
              <TableCell>
                {data.firstname} {data.lastname}
              </TableCell>
              <TableCell>{/* <EditBio user={data} /> */}</TableCell>
            </TableRow>
            <TableRow
              key={data.email}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>Email</TableCell>
              <TableCell>{data.email}</TableCell>
              <TableCell>{/* <EditBio user={data} /> */}</TableCell>
            </TableRow>
            <TableRow
              key={data.bio}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>Bio</TableCell>
              <TableCell>{data.bio}</TableCell>
              <TableCell>
                <EditBio user={data} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </ViewHeightContainer>
  );
};

export default Profile;
