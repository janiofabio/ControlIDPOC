import React, { useState } from "react";
import { useTranslate } from "@refinedev/core";
import { Edit } from "@refinedev/mui";
import { Button, TextField, Box, Grid, Typography, IconButton, Tab, Tabs, useTheme, FormGroup, FormControlLabel, Switch } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { FormProvider } from 'react-hook-form';
import GeralSectionEdit from "@components/GeralSectionEdit";
import AddInfoSectionEdit from "@components/AddInfoSectionEdit";
import PhotoCamera from '@mui/icons-material/PhotoCamera'; 
import PhoneInput from "react-phone-input-2"; 
import "react-phone-input-2/lib/style.css"; 

export const PersonEdit = () => {
    const translate = useTranslate();
    const methods = useForm(); 

    const {
        register,
        control,
        formState: { errors },
        setValue,
        getValues,
        watch,
        trigger,
    } = useForm();

    const theme = useTheme();

    const { saveButtonProps, refineCore: { queryResult } } = methods;

    const peopleData = queryResult?.data?.data;
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <FormProvider {...methods}> {/* contexto  */}
            <Edit saveButtonProps={saveButtonProps}>
                <Box sx={{ padding: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        {translate("Editar Pessoa")}
                    </Typography>

                    <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid #ddd',
                                padding: 2,
                                borderRadius: 1,
                                mb: 2,
                                backgroundColor: 'background.paper'
                            }}
                        >
                            {/* Área para upload de foto */}
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="raised-button-file"
                                type="file"
                            />
                            <label htmlFor="raised-button-file">
                                <Button variant="contained" component="span">
                                    {translate("Upload Photo")}
                                </Button>
                            </label>
                            {peopleData?.profilePicture && (
                                <img
                                    src={peopleData.profilePicture}
                                    alt="Foto de Perfil"
                                    style={{ width: '100%', height: 'auto', borderRadius: '50%' }}
                                />
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("name", {
                                        required: "This field is required",
                                    })}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label={"Nome"}
                                    name="name"
                                    defaultValue={peopleData?.name}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("email", {
                                        required: "This field is required",
                                    })}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label={"e-mail"}
                                    name="email"
                                    defaultValue={peopleData?.email}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    {...register("registration")}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    type="text"
                                    label={"Matrícula"}
                                    name="registration"
                                    defaultValue={peopleData?.registration}
                                />
                            </Grid>
                            {/* celular */}
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" color={theme.palette.text.primary}>
                                    Número do Celular
                                </Typography>
                                <PhoneInput
                                    country={"br"} // Brasil
                                    onlyCountries={["br", "us", "es", "cn"]} // Países 
                                    countryCodeEditable={false}
                                    containerStyle={{
                                        margin: 'normal',
                                        width: '100%',
                                        backgroundColor: theme.palette.background.paper,
                                        border: `1px solid ${theme.palette.divider}`
                                    }}
                                    inputStyle={{
                                        width: '100%',
                                        backgroundColor: theme.palette.background.paper,
                                        color: theme.palette.text.primary
                                    }}
                                    buttonStyle={{
                                        backgroundColor: theme.palette.background.paper,
                                        border: `1px solid ${theme.palette.divider}`
                                    }}
                                    inputProps={{
                                        name: 'phoneNumber',
                                        required: true,
                                    }}
                                    specialLabel="Número do Celular"
                                    value={getValues("phoneNumber") || peopleData?.phoneNumber}
                                    onChange={(value) => setValue("phoneNumber", value)} 
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>


                    <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 2 }}>
                        <Tabs value={tabValue} onChange={handleTabChange}>
                            <Tab label="Geral" />
                            <Tab label="Informações Adicionais" />
                            <Tab label="Documentos" />
                            <Tab label="Grupos" />
                        </Tabs>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <TabPanel value={tabValue} index={0}>
                            <GeralSectionEdit peopleData={peopleData} />
                        </TabPanel>

                        <TabPanel value={tabValue} index={1}>
                            {/* Informações Adicionais */}
                            <AddInfoSectionEdit 
                               errors={methods.formState.errors} 
                               peopleData={peopleData} 
                            />
                        </TabPanel>

                        <TabPanel value={tabValue} index={2}>
                            {/* Documentos */}
                        </TabPanel>

                        <TabPanel value={tabValue} index={3}>
                            {/* Grupos */}
                        </TabPanel>
                    </Box>
                </Box>
            </Edit>
        </FormProvider>
    );
};


// abas
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
    return (
        <Box
            role="tabpanel"
            hidden={value !== index} // aba desativa
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
            sx={{ display: value === index ? 'block' : 'none' }} // aba ativa
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Box>
    );
};