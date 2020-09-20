import React, { forwardRef, useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Visibility from '@material-ui/icons/Visibility';
import {
  Grid,
  Typography,
  Toolbar,
  AppBar,
  Breadcrumbs,
  Link
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from "axios";

import './styles.css';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  Visibility: forwardRef((props, ref) => <Visibility {...props} ref={ref} />)
};

const useStyles = makeStyles((theme) => ({
  dadosContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
    backgroundColor: "#eaeaea"
  },
  loading: {
    margin: "auto"
  },
  boxTabela: {
    marginTop: "40px",
  },
  tabela: {
    height: "500px",
    alignItems: 'center',
  },
  celula: {
    color: "#0000FF"
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Data(props) {
  const { match } = props;
  const { params } = match;
  const { idFaculdade, nomeFaculdade, idCurso, nomeCurso } = params;
  const classes = useStyles();
  const [dadosData, setDadosData] = useState(undefined);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
    .get(`http://localhost:3333/dados/${idCurso}`)
    .then(function (response) {
      const dados = response.data;
      setDadosData(dados)
    });
  }, [idCurso]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography>ENADE/INEP</Typography>
        </Toolbar>
      </AppBar>
      <Grid container alignItems='center'  className={classes.dadosContainer} style={{ maxHeight: 800 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/">
            Faculdades
          </Link>
          <Link color="inherit" href={"../../../../cursos/" + idFaculdade + '/' + nomeFaculdade}>
            Cursos
          </Link>
          <Typography color="textPrimary">Dados</Typography>
        </Breadcrumbs>
          <Grid item xs={12} className={classes.boxTabela}>
          <Typography variant="h4" color="textPrimary">ENADE {nomeCurso} {nomeFaculdade}</Typography>
          <Typography variant="body1" color="textPrimary">
            Explore as provas e percentuais de acertos de questões do ENADE {nomeCurso}!<br></br>
            Clique nas colunas para ORDENAR e preencha campos para FILTRAR.
          </Typography>
          <br></br>
            <MaterialTable
              isLoading={dadosData ? false : true}
              localization={{
                body: {
                  filterRow: {
                    filterTooltip:"Filtrar"
                  },
                },
                toolbar: {
                  searchPlaceholder:"Pesquisar",
                  searchTooltip:"Pesquisar",
                },
                pagination: {
                  labelDisplayedRows:"{from}-{to} de {count}",
                  labelRowsSelect:"linhas",
                  labelRowsPerPage:"Linhas por página",
                  firstAriaLabel:"Primeira Página",
                  firstTooltip:"Primeira Página",
                  previousAriaLabel:"Página Anterior",
                  previousTooltip:"Página Anterior",
                  nextAriaLabel:"Próxima Página",
                  nextTooltip:"Próxima Página",
                  lastAriaLabel:"Última Página",
                  lastTooltip:"Última Página",
                },
              }}
              icons={tableIcons}
              title={nomeCurso}
              actions={[
                {
                  icon: (props, ref) => <Visibility {...props} ref={ref} />,
                  tooltip: 'Add User',
                  isFreeAction: true,
                  onClick: (event) => handleOpen()
                }
              ]}
              columns={[
                { 
                  title: 'Ano',
                  field: 'ano', 
                  type: 'numeric',
                  align: 'center',
                  render: rowData => <Link color="inherit" href={rowData.urlprova} className={classes.celula} >{rowData.ano}</Link>
                },
                { title: 'Prova', field: 'prova',align: 'center' },
                { title: 'Tipo Questão', field: 'tipoquestao',align: 'center' },
                {
                  title: 'Id Questão',
                  field: 'idquestao', type: 'numeric',
                  align: 'center',
                  render: rowData => <Link color="inherit" href={rowData.urlprova} className={classes.celula} >{rowData.idquestao}</Link> 
                },
                { title: 'Gabarito', field: 'gabarito',align: 'center' },
                { title: 'Objeto', field: 'objeto',align: 'center' },
                { 
                  title: '% Acertos Curso', field: 'acertoscurso', type: 'numeric',
                  align: 'center',
                  render: rowData => <Link color="inherit" href={rowData.urlcurso} className={classes.celula} >{rowData.acertoscurso}</Link> 
                },
                { title: '% Acertos Região', field: 'acertosregiao', type: 'numeric' ,align: 'center' },
                { title: '% Acertos Brasil', field: 'acertosbrasil', type: 'numeric' ,align: 'center' },
                { title: 'Dif. (Curso-Brasil)', field: 'acertosdif', type: 'numeric' ,align: 'center' },
              ]}
              data={dadosData}        
              options={{
                filtering: true,
                maxBodyHeight: 630,
                rowStyle: {
                  fontSize:11,
                },
              }}
            />
            <br/><br/>
            
          </Grid>
      </Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <MaterialTable
              localization={{
                body: {
                  filterRow: {
                    filterTooltip:"Filtrar"
                  },
                },
                toolbar: {
                  searchPlaceholder:"Pesquisar",
                  searchTooltip:"Pesquisar",
                },
                pagination: {
                  labelDisplayedRows:"{from}-{to} de {count}",
                  labelRowsSelect:"linhas",
                  labelRowsPerPage:"Linhas por página",
                  firstAriaLabel:"Primeira Página",
                  firstTooltip:"Primeira Página",
                  previousAriaLabel:"Página Anterior",
                  previousTooltip:"Página Anterior",
                  nextAriaLabel:"Próxima Página",
                  nextTooltip:"Próxima Página",
                  lastAriaLabel:"Última Página",
                  lastTooltip:"Última Página",
                },
              }}
              tableLayout="fixed"
              icons={tableIcons}
              title={nomeCurso}
              columns={[
                { 
                  title: 'Ano',
                  field: 'ano', 
                  type: 'numeric',
                  align: 'center', 
                  render: rowData => <Link color="inherit" href={rowData.urlprova} className={classes.celula} >{rowData.ano}</Link>
                },
                { title: 'Prova', field: 'prova',align: 'center' },
                { title: 'Tipo Questão', field: 'tipoquestao',align: 'center' },
                {
                  title: 'Id Questão',
                  field: 'idquestao', type: 'numeric',
                  align: 'center',
                  render: rowData => <Link color="inherit" href={rowData.urlprova} className={classes.celula} >{rowData.idquestao}</Link> 
                },
                { title: 'Gabarito', field: 'gabarito',align: 'center' },
                { title: 'Objeto', field: 'objeto',align: 'center' },
                { 
                  title: '% Acertos Curso', field: 'acertoscurso', type: 'numeric',
                  align: 'center',
                  render: rowData => <Link color="inherit" href={rowData.urlcurso} className={classes.celula} >{rowData.acertoscurso}</Link> 
                },
                { title: '% Acertos Região', field: 'acertosregiao', type: 'numeric' ,align: 'center' },
                { title: '% Acertos Brasil', field: 'acertosbrasil', type: 'numeric' ,align: 'center' },
                { title: 'Dif. (Curso-Brasil)', field: 'acertosdif', type: 'numeric' ,align: 'center' },
              ]}
              data={dadosData}        
              options={{
                filtering: true,
                maxBodyHeight: 600,
              }}
            />
          </div>
        </Fade>
      </Modal>
    </>
  );
}