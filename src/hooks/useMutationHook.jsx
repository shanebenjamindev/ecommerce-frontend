import { useMutation } from "react-query";

export function useMutationHook(fnCallback) {
    const mutation = useMutation(fnCallback)
    return mutation
}
