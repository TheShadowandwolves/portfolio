
interface ListGroupProps {
    items: string[];
    heading?: string;
    onSelectItem?: (item: string) => void;
}

function ListGroup({ items, heading }: ListGroupProps) {
    return (
        <div className="list-group-container">
            {heading && <h3>{heading}</h3>}
            <ul className="list-group">
                {items.map((item, index) => (
                    <li key={index} className="list-group-item">{item}</li>
                ))}
            </ul>
        </div>
    );
}
export default ListGroup;