import { NodeRes } from "../../types/node"
import { Resource } from "../../types/resource"
import { TableNodeRes } from "../../types/table"

export const formatNodeResToTable = (node_res: NodeRes, resources: Resource[]) => {
    const resource = resources.find((r: Resource) => r.id === node_res.res_id)
    if (resource) {
        return { sys_name: resource.sys_name, formula: node_res.value } as TableNodeRes
    }
    return null
}

export const formatNodeResourcesToTable = (node_resources: NodeRes[], resources: Resource[], inOut: number) => {
    const result: TableNodeRes[] = []

    node_resources.forEach((res: NodeRes) => {
        if (res.res_in_out !== inOut) return
        const formattedRes = formatNodeResToTable(res, resources)
        if (formattedRes) result.push(formattedRes)
    })
    return result
}