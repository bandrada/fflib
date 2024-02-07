export function getApex(name) {
    const data =
`public class ${name} {
    public void ${name}() {
    
    }
}`;
    return data;
}