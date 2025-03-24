import { useSelector } from "react-redux"

export const formatRelationToEdge = (relation: any) => {
    return {
        id: `${relation.id}`,
        type: 'step',
        source: relation.source_id.toString(),
        target: relation.target_id.toString(),
    }
}

export const formatEdgeToRelation = (edge: any) => {
    return {
        source_id: Number(edge.source),
        target_id: Number(edge.target),
        model_id: Number(localStorage.getItem('modelId'))
    }
}

export const formatRelationsToEdges = (relations: any) => relations.map((rel: any) => formatRelationToEdge(rel))

export const formatEdgesToRelations = (edges: any) => edges.map((edge: any) => formatEdgeToRelation(edge))