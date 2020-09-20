import React, { useEffect, useState } from 'react';
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Toolbar,
  AppBar,
  TextField,
  Breadcrumbs
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import './styles.css';

const useStyles = makeStyles((theme) => ({
  faculdadesContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
    backgroundColor: "#eaeaea",
    paddingBottom: "40px"
  },
  card: {
    margin: "10px 0px",
    border: "1px #303f9f solid"
  },
  cardContent: {
    textAlign: "center",
    color:"black",
    paddingTop:"23px",
  },
  searchContainer: {
    display: "flex",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "5px",
    marginBottom: "20px",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    width: "100%",
    margin: "5px",
  },
  loading: {
    margin: "auto"
  }
}));

export default function Home() {
  const history = useHistory();
  const classes = useStyles();
  const [filter, setFilter] = useState("");
  const [faculdadeData, setFaculdadeData] = useState(undefined);

  useEffect(() => {
    axios
      .get(`http://localhost:3333/faculdades`)
      .then(function (response) {
        const dados = response.data;
        const upData = Object.keys(dados).map(faculdadeId => {
          const item = {
            id: dados[faculdadeId].id,
            nome: dados[faculdadeId].nome.toUpperCase()
          }
          return item;
        })
        setFaculdadeData(upData)
      });
  }, []);
  

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const getFaculdadeCard = (faculdadeId) => {
    const { id, nome } = faculdadeData[faculdadeId];
    return (
      <Grid item xs={12} key={id}>
        <Card className={classes.card} onClick={() => history.push(`cursos/${id}/${nome}`)}>
          <CardContent className={classes.cardContent}>
            <Typography color="primary" align="center">{nome}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <>
    
      <AppBar position="static">
        <Toolbar>
          <Typography>ENADE/INEP</Typography>
        </Toolbar>
      </AppBar>
      <Grid container alignItems='center'  className={classes.faculdadesContainer}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary">Faculdades /</Typography>
        </Breadcrumbs>
        <Grid item xs={12}>
          <br/><br/>
          <Typography variant="h4" color="textPrimary">Faculdades</Typography>
          <div className={classes.searchContainer}>
            <SearchIcon className={classes.searchIcon} />
            <TextField
              className={classes.searchInput}
              onChange={handleSearchChange}
              label="Faculdade"
              variant="standard"
            />
          </div>
        </Grid>
        {faculdadeData ? (
          <>
            {Object.keys(faculdadeData).map(
              (faculdadeId) =>
              faculdadeData[faculdadeId].nome.includes(filter.toUpperCase()) &&
                getFaculdadeCard(faculdadeId)
            )}
          </>
        ) : (
          <CircularProgress className={classes.loading}/>
        )}
        <br></br><br></br>
      </Grid>
    </>
  );
}