<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BST Visualizer</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f0f0f0;
            padding: 20px;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            display: inline-block;
        }
        button {
            margin: 5px;
            padding: 10px 20px;
            border: none;
            background-color: #4CAF50;
            color: white;
            cursor: pointer;
            border-radius: 5px;
        }
        button:hover {
            background-color: #45a049;
        }
        input[type="number"] {
            padding: 8px;
            width: 100px;
            border-radius: 5px;
            border: 1px solid #ccc;
        }
        #tree {
            margin-top: 20px;
        }
        .node {
            display: inline-block;
            margin: 10px;
            padding: 10px;
            background-color: #87CEFA;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            line-height: 40px;
            color: white;
        }
        .connector {
            height: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Binary Search Tree Visualizer</h2>
        <input type="number" id="inputValue" placeholder="Enter number">
        <button onclick="insertNode()">Insert</button>
        <button onclick="deleteNode()">Delete</button>
        <button onclick="searchNode()">Search</button>
        <div id="result"></div>
        <div id="tree"></div>
    </div>

    <script>
        class Node {
            constructor(data) {
                this.data = data;
                this.left = null;
                this.right = null;
            }
        }

        class BST {
            constructor() {
                this.root = null;
            }

            insert(data) {
                this.root = this._insertRec(this.root, data);
            }

            _insertRec(node, data) {
                if (node === null) return new Node(data);
                if (data < node.data) node.left = this._insertRec(node.left, data);
                else if (data > node.data) node.right = this._insertRec(node.right, data);
                return node;
            }

            delete(data) {
                this.root = this._deleteRec(this.root, data);
            }

            _deleteRec(node, data) {
                if (!node) return null;
                if (data < node.data) node.left = this._deleteRec(node.left, data);
                else if (data > node.data) node.right = this._deleteRec(node.right, data);
                else {
                    if (!node.left) return node.right;
                    if (!node.right) return node.left;
                    let minNode = this._minValueNode(node.right);
                    node.data = minNode.data;
                    node.right = this._deleteRec(node.right, minNode.data);
                }
                return node;
            }

            _minValueNode(node) {
                while (node.left) node = node.left;
                return node;
            }

            search(data) {
                return this._searchRec(this.root, data);
            }

            _searchRec(node, data) {
                if (!node || node.data === data) return node;
                return data < node.data ? this._searchRec(node.left, data) : this._searchRec(node.right, data);
            }
        }

        const bst = new BST();

        function insertNode() {
            const value = parseInt(document.getElementById('inputValue').value);
            if (!isNaN(value)) {
                bst.insert(value);
                displayTree();
                document.getElementById('result').innerText = `Inserted ${value}`;
            }
        }

        function deleteNode() {
            const value = parseInt(document.getElementById('inputValue').value);
            if (!isNaN(value)) {
                bst.delete(value);
                displayTree();
                document.getElementById('result').innerText = `Deleted ${value}`;
            }
        }

        function searchNode() {
            const value = parseInt(document.getElementById('inputValue').value);
            if (!isNaN(value)) {
                const found = bst.search(value);
                document.getElementById('result').innerText = found ? `${value} found in tree.` : `${value} not found.`;
            }
        }

        function displayTree() {
            const treeDiv = document.getElementById('tree');
            treeDiv.innerHTML = '';
            renderNode(bst.root, treeDiv);
        }

        function renderNode(node, parentDiv) {
            if (!node) return;

            const nodeDiv = document.createElement('div');
            nodeDiv.className = 'node';
            nodeDiv.innerText = node.data;
            parentDiv.appendChild(nodeDiv);

            const connectors = document.createElement('div');
            connectors.className = 'connector';
            parentDiv.appendChild(connectors);

            const childrenDiv = document.createElement('div');
            childrenDiv.style.display = 'flex';
            childrenDiv.style.justifyContent = 'center';
            parentDiv.appendChild(childrenDiv);

            if (node.left) renderNode(node.left, childrenDiv);
            if (node.right) renderNode(node.right, childrenDiv);
        }
    </script>
</body>
</html>
