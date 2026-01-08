import { useState } from 'react';

interface ListGroupProps {
    items: string[];
    heading?: string;
    onSelectItem?: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: ListGroupProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    return (
        <div className="list-group-container">
            {heading && <h3>{heading}</h3>}
            <ul className="list-group">
                {items.map((item, index) => (
                    <li key={index} className={selectedIndex === index ? "list-group-item active" : "list-group-item"} onClick={() => onSelectItem && onSelectItem(item)}>{item}</li>
                ))}
            </ul>
        </div>
    );
}
export default ListGroup;