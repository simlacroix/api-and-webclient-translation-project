import React, {useEffect, useState} from 'react';
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField
} from "@mui/material";
import {
    TranslationQueryParams,
    TranslationResponse,
    useTranslationMutation
} from "../app/slices/TraductionBackendSlice";
import {LoadingButton} from "@mui/lab";

const TranslationPage: React.FC = () => {
    const [translation, setTranslation] = useState<TranslationQueryParams>({
        sourceLanguage: 'en',
        targetLanguages: ['fr'],
        sourceText: '',
    });
    const [translatedText, setTranslatedText] = useState<TranslationResponse | null>(null);

    const [translate, {
        isLoading: translateIsLoading
    }] = useTranslationMutation();

    useEffect(() => {
        const fetchTimeout = setTimeout(handleTranslation, 2000)
        return () => clearTimeout(fetchTimeout)
    }, [translation.sourceText])
    const handleTranslation = async () => {
        if (translation.sourceText === "")
            return;
        try {
            const response = await translate({
                ...translation,
                sourceLanguage: translation.sourceLanguage === "auto" ? "" : translation.sourceLanguage
            }).unwrap();

            console.log(response)

            if (response.detectedLanguage) {
                setTranslation({
                    ...translation,
                    sourceLanguage: response.detectedLanguage.language
                })
            }

            setTranslatedText(response);
        } catch (error) {
            console.error('Erreur de traduction :', error);
        }
    };

    const getTranslatedValues = () => {
        if (translatedText) {
            if (translatedText.translations.length > 1) {
                return translatedText.translations.map(value => `${value.to}:\n${value.text}`).join("\n\n");
            }

            return translatedText.translations[0].text;
        }

        return "";
    }

    return (
        <Paper elevation={24}>
            <Card className={"h-fit w-fit"}>
                <CardHeader title={"Traduction"}/>
                <CardContent>
                    <div className={"flex items-center gap-x-6"}>
                        <div className={"flex flex-col gap-y-4"}>
                            <FormControl className={"w-48"}>
                                <InputLabel>Langue source</InputLabel>
                                <Select value={translation.sourceLanguage}
                                        onChange={(e) => setTranslation({
                                            ...translation,
                                            sourceLanguage: e.target.value
                                        })}
                                        label={"Langue source"}>
                                    <MenuItem value={"auto"}>Auto</MenuItem>
                                    <MenuItem value={"en"}>English</MenuItem>
                                    <MenuItem value={"fr"}>Français</MenuItem>
                                    <MenuItem value={"es"}>Español</MenuItem>
                                    <MenuItem value={"de"}>Deutsch</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField className={"w-[650px]"} multiline rows={15} label={"Texte à traduire"}
                                       placeholder={"Entrez le texte à traduire"}
                                       value={translation.sourceText}
                                       onChange={(e) => {
                                           setTranslation({...translation, sourceText: e.target.value})
                                           if (translatedText)
                                               setTranslatedText(null)
                                       }}/>
                        </div>
                        <div className={"flex flex-col gap-y-4"}>
                            <FormControl className={"w-48"}>
                                <InputLabel>Langue cible</InputLabel>
                                <Select value={translation.targetLanguages}
                                        onChange={(e) => setTranslation({
                                            ...translation,
                                            targetLanguages: [...e.target.value].length > 0 ? [...e.target.value] : translation.targetLanguages
                                        })}
                                        label={"Langue source"} multiple>
                                    <MenuItem value={"en"}>English</MenuItem>
                                    <MenuItem value={"fr"}>Français</MenuItem>
                                    <MenuItem value={"es"}>Español</MenuItem>
                                    <MenuItem value={"de"}>Deutsch</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField className={"w-[650px]"} multiline rows={15} label={"Résultat"}
                                       placeholder={"Résultat de la traduction"}
                                       value={getTranslatedValues()}
                                       aria-readonly>

                            </TextField>
                        </div>
                    </div>

                </CardContent>
                <CardActions>
                    <LoadingButton loading={translateIsLoading} disabled={translateIsLoading}
                                   onClick={handleTranslation} variant={"contained"}>Traduire</LoadingButton>
                </CardActions>
            </Card>
        </Paper>
    );
};

export default TranslationPage;
