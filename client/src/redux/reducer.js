import { GET_ALL_RECIPES, GET_DIETS, FILTER_BY_DIETS, ORDER_BY_ALPHABETIC,
     ORDER_BY_HEALTH, DETAIL, BUSCAR, LIMPIAR_DETAIL} from "./actions";

const initialState = {
    allRecipes:[],
    orderRecipes:[],
    diets:[],
    detail:{},
}

function reducer (state = initialState, action){
    switch(action.type){
        case GET_ALL_RECIPES:{
            return {
                ...state,
                allRecipes: action.payload,
                orderRecipes: action.payload
            }
        }
        case GET_DIETS:{
            return {
                ...state,
                diets: action.payload
            }
        }
        case FILTER_BY_DIETS:{
            const filtrado = state.allRecipes.filter(unidad => unidad.diets.some((uno)=> uno === action.payload))
            const filtradoApi= state.allRecipes.filter(unidad => unidad.diets.some(dieta => dieta.name === action.payload))
            const filtrosUnidos = [...filtrado,...filtradoApi]
            const mostrar = action.payload === 'todos' ? state.allRecipes : filtrosUnidos 
            return {
                ...state,
                orderRecipes: mostrar
            }
        }
        case ORDER_BY_ALPHABETIC: {
            
            const mostrar = action.payload === 'az' ? state.orderRecipes.sort((a,b)=>{
                if(a.name < b.name) return -1;
                if(a.name > b.name) return 1;
                 return 0;
            }) 
            : 
            state.orderRecipes.sort((a,b)=>{
                if( a.name > b.name) return -1;
                if( a.name < b.name) return 1;
                 return 0
            })
            return {
                ...state,
                orderRecipes: mostrar
            }
        }
        case ORDER_BY_HEALTH: {

            const nivelSano = action.payload === 'mas' ? state.orderRecipes.sort((a,b)=>{
                if(a.healthScore > b.healthScore) return -1;
                if(a.healthScore < b.healthScore) return 1;
                 return 0
            }) : state.orderRecipes.sort((a,b)=>{
                if(a.healthScore < b.healthScore) return -1;
                if(a.healthScore > b.healthScore) return 1;
                return 0
            })
            return {
                ...state,
                orderRecipes: nivelSano
            }
        }
        case DETAIL:{
            return {
                ...state,
                detail: action.payload
            }
        }
        case BUSCAR:{
            return {
                ...state,
                orderRecipes: action.payload
            }
        }
        case LIMPIAR_DETAIL: {
            return {
                ...state,
                detail: {}
            }
        }
        default:
            return state
    }
}

export default reducer;