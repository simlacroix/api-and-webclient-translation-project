import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {
    TranslationHistoryResponse,
    useDeleteHistoryMutation,
    useHandleFavoriteMutation,
    useTranslationsQuery
} from "../app/slices/TraductionBackendSlice.ts";
import {Card, CardContent, CardHeader} from "@mui/material";
import TextCell from "../components/TextCell";
import DeleteIcon from '@mui/icons-material/Delete';
import {LoadingButton} from "@mui/lab";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const HistoryPage = () => {

    const {
        data: translations = [],
        isLoading: translationsIsLoading
    } = useTranslationsQuery();

    const [deleteHistory, {isLoading: deleteHistoryIsLoading}] = useDeleteHistoryMutation();

    const [handleFavoriteQuery, {isLoading: handleFavoriteIsLoading}] = useHandleFavoriteMutation();

    const handleFavorite = (translationId: number, currentValue: boolean) => {
        handleFavoriteQuery({translationId: translationId, isFavorite: !currentValue})
    }

    const columns: GridColDef<TranslationHistoryResponse>[] = [
        {field: 'id', headerName: 'Transaction n°', width: 105},
        {field: 'sourceLanguage', headerName: 'Langue source', width: 105},
        {
            field: 'sourceText',
            headerName: 'Texte source',
            flex: 1,
            renderCell: params => (<TextCell value={params.value}/>)
        },
        {field: 'targetLanguage', headerName: 'Langue ciblé', width: 92},
        {
            field: 'translatedText',
            headerName: 'Texte résultant',
            flex: 1,
            renderCell: params => (<TextCell value={params.value}/>)
        },
        {
            field: 'timestamp', headerName: 'En date du', width: 155, valueGetter: params => {
                const date = new Date(params.value);

                return `${date.getFullYear()}-${date.getMonth().toString().padStart(2, '0')}-${date.getDay().toString().padStart(2, '0')}
                ${date.getHours().toString().padStart(2, '0')}-${date.getMinutes().toString().padStart(2, '0')}-${date.getSeconds().toString().padStart(2, '0')}`
            }
        },
        {
            field: 'isFavorite', headerName: "", width: 50, renderCell: params => {
                return (
                    params.value ?
                        <StarIcon className={"cursor-pointer"} sx={{color: "#f59e0b"}}
                                  onClick={() => handleFavorite(params.row.id, params.value)}/> :
                        <StarBorderIcon className={"cursor-pointer"}
                                        onClick={() => handleFavorite(params.row.id, params.value)}/>
                )
            }
        }
    ];

    return (
        <Card>
            <CardHeader title={"Historique de traduction"}
                        action={<LoadingButton loading={deleteHistoryIsLoading} onClick={deleteHistory}>
                            {deleteHistoryIsLoading ? (<></>) : (<DeleteIcon
                                color={"error"}/>)}
                        </LoadingButton>
                        }/>
            <CardContent className={"w-fit"}>
                <DataGrid className={"w-[1000px]"}
                          autoHeight
                          rows={translations}
                          columns={columns}
                          initialState={{
                              pagination: {
                                  paginationModel: {page: 0, pageSize: 5},
                              },
                          }}
                          pageSizeOptions={[5, 10]}
                          loading={translationsIsLoading || handleFavoriteIsLoading}
                />
            </CardContent>
        </Card>
    )
};

export default HistoryPage