import ReactJson from 'react-json-view'

export default function Json({ json }: { json: any }) {
  return <ReactJson src={json} collapsed={1} name={null} />
}
