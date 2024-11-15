import React from "react";
import { useShow, useTranslate } from "@refinedev/core";
import { Show, NumberField, TextFieldComponent as TextField, DateField } from "@refinedev/mui";
import { Box, Typography, Stack, Grid, Tab, Tabs } from "@mui/material";

export const PersonShow: React.FC = () => {
    const translate = useTranslate();
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const [tabValue, setTabValue] = React.useState(0);

    const record = data?.data;

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Show isLoading={isLoading}>
            <Box sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Visualizar Pessoa
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
                            <img
                                src={record?.profilePicture}
                                alt="Foto de Perfil"
                                style={{ width: '100%', height: 'auto', borderRadius: '50%' }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    {translate("people.fields.name")}
                                </Typography>
                                <TextField value={record?.name} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    {translate("people.fields.registration")}
                                </Typography>
                                <TextField value={record?.registration} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    {translate("people.fields.observations")}
                                </Typography>
                                <TextField value={record?.observations} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    {translate("people.fields.registrationDate")}
                                </Typography>
                                <DateField value={record?.registrationDate} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="Detalhes">
                    <Tab label="Endereço" />
                    <Tab label="Outros Dados" />
                </Tabs>
                {tabValue === 0 && (
                    <Box sx={{ padding: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    {translate("people.fields.address")}
                                </Typography>
                                <TextField value={record?.address} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    {translate("people.fields.number")}
                                </Typography>
                                <NumberField value={record?.number} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    {translate("people.fields.zipCode")}
                                </Typography>
                                <TextField value={record?.zipCode} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    {translate("people.fields.city")}
                                </Typography>
                                <TextField value={record?.city} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" fontWeight="bold">
                                    {translate("people.fields.state")}
                                </Typography>
                                <TextField value={record?.state} />
                            </Grid>
                        </Grid>
                    </Box>
                )}
                {tabValue === 1 && (
                    <Box sx={{ padding: 2 }}>
                        {/* Outros campos para outros dados */}
                    </Box>
                )}
            </Box>
        </Show>
    );
};
