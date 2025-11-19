// Diff Engine - SOLID Principles Implementation
// This module provides text and JSON diff functionality

// ============================================================================
// INTERFACES & BASE CLASSES (Dependency Inversion Principle)
// ============================================================================

/**
 * Base class for diff strategies (Open/Closed Principle)
 */
class DiffStrategy {
    /**
     * Execute diff comparison
     * @param {string[]} original - Original lines
     * @param {string[]} modified - Modified lines
     * @returns {Object} Diff result
     */
    execute(original, modified) {
        throw new Error('DiffStrategy.execute() must be implemented');
    }
}

/**
 * Base class for diff formatters (Open/Closed Principle)
 */
class DiffFormatter {
    /**
     * Format diff result for display
     * @param {Object} diffResult - Result from diff engine
     * @returns {Object} Formatted output
     */
    format(diffResult) {
        throw new Error('DiffFormatter.format() must be implemented');
    }
}

// ============================================================================
// DIFF STRATEGIES (Strategy Pattern)
// ============================================================================

/**
 * Myers Diff Algorithm Implementation
 * Single Responsibility: Compute optimal diff using Myers algorithm
 */
class MyersDiffStrategy extends DiffStrategy {
    execute(original, modified) {
        const n = original.length;
        const m = modified.length;
        const max = n + m;
        
        // V array stores the endpoints of the furthest reaching D-paths
        const v = {};
        v[1] = 0;
        
        const trace = [];
        
        // Iterate through each diagonal
        for (let d = 0; d <= max; d++) {
            trace.push({...v});
            
            for (let k = -d; k <= d; k += 2) {
                // Choose whether to move down or right
                let x;
                if (k === -d || (k !== d && v[k - 1] < v[k + 1])) {
                    x = v[k + 1];
                } else {
                    x = v[k - 1] + 1;
                }
                
                let y = x - k;
                
                // Move diagonally while lines match
                while (x < n && y < m && original[x] === modified[y]) {
                    x++;
                    y++;
                }
                
                v[k] = x;
                
                // Check if we've reached the end
                if (x >= n && y >= m) {
                    return this.backtrack(original, modified, trace, d);
                }
            }
        }
        
        // Fallback: treat everything as changed
        return this.generateFallbackDiff(original, modified);
    }
    
    backtrack(original, modified, trace, d) {
        const changes = [];
        let x = original.length;
        let y = modified.length;
        
        for (let depth = d; depth >= 0; depth--) {
            const v = trace[depth];
            const k = x - y;
            
            let prevK;
            if (k === -depth || (k !== depth && v[k - 1] < v[k + 1])) {
                prevK = k + 1;
            } else {
                prevK = k - 1;
            }
            
            const prevX = v[prevK];
            const prevY = prevX - prevK;
            
            // Move diagonally (no change)
            while (x > prevX && y > prevY) {
                changes.unshift({
                    type: 'equal',
                    originalLine: x - 1,
                    modifiedLine: y - 1,
                    content: original[x - 1]
                });
                x--;
                y--;
            }
            
            // Move down (deletion)
            if (x > prevX) {
                changes.unshift({
                    type: 'delete',
                    originalLine: x - 1,
                    modifiedLine: -1,
                    content: original[x - 1]
                });
                x--;
            }
            // Move right (insertion)
            else if (y > prevY) {
                changes.unshift({
                    type: 'insert',
                    originalLine: -1,
                    modifiedLine: y - 1,
                    content: modified[y - 1]
                });
                y--;
            }
        }
        
        return { changes, original, modified };
    }
    
    generateFallbackDiff(original, modified) {
        const changes = [];
        
        original.forEach((line, index) => {
            changes.push({
                type: 'delete',
                originalLine: index,
                modifiedLine: -1,
                content: line
            });
        });
        
        modified.forEach((line, index) => {
            changes.push({
                type: 'insert',
                originalLine: -1,
                modifiedLine: index,
                content: line
            });
        });
        
        return { changes, original, modified };
    }
}

/**
 * Simple Line-by-Line Diff Strategy
 * Single Responsibility: Quick line comparison
 */
class LineDiffStrategy extends DiffStrategy {
    execute(original, modified) {
        const changes = [];
        const maxLen = Math.max(original.length, modified.length);
        
        for (let i = 0; i < maxLen; i++) {
            const origLine = i < original.length ? original[i] : null;
            const modLine = i < modified.length ? modified[i] : null;
            
            if (origLine === null) {
                changes.push({
                    type: 'insert',
                    originalLine: -1,
                    modifiedLine: i,
                    content: modLine
                });
            } else if (modLine === null) {
                changes.push({
                    type: 'delete',
                    originalLine: i,
                    modifiedLine: -1,
                    content: origLine
                });
            } else if (origLine === modLine) {
                changes.push({
                    type: 'equal',
                    originalLine: i,
                    modifiedLine: i,
                    content: origLine
                });
            } else {
                changes.push({
                    type: 'delete',
                    originalLine: i,
                    modifiedLine: -1,
                    content: origLine
                });
                changes.push({
                    type: 'insert',
                    originalLine: -1,
                    modifiedLine: i,
                    content: modLine
                });
            }
        }
        
        return { changes, original, modified };
    }
}

/**
 * Word-level Diff Strategy
 * Single Responsibility: Compare at word level for finer granularity
 */
class WordDiffStrategy extends DiffStrategy {
    execute(original, modified) {
        const origWords = this.splitIntoWords(original.join('\n'));
        const modWords = this.splitIntoWords(modified.join('\n'));
        
        const myersDiff = new MyersDiffStrategy();
        return myersDiff.execute(origWords, modWords);
    }
    
    splitIntoWords(text) {
        return text.split(/(\s+|\b)/).filter(word => word.length > 0);
    }
}

// ============================================================================
// DIFF FORMATTERS (Interface Segregation Principle)
// ============================================================================

/**
 * Side-by-Side Formatter
 * Single Responsibility: Format diff for side-by-side display
 */
class SideBySideFormatter extends DiffFormatter {
    format(diffResult, options = {}) {
        const { changes, original, modified } = diffResult;
        const leftLines = [];
        const rightLines = [];
        
        let leftLineNum = 1;
        let rightLineNum = 1;
        
        changes.forEach(change => {
            const lineInfo = {
                type: change.type,
                content: change.content,
                leftNum: null,
                rightNum: null
            };
            
            switch (change.type) {
                case 'equal':
                    leftLines.push({ ...lineInfo, leftNum: leftLineNum++, rightNum: rightLineNum });
                    rightLines.push({ ...lineInfo, leftNum: leftLineNum - 1, rightNum: rightLineNum++ });
                    break;
                    
                case 'delete':
                    leftLines.push({ ...lineInfo, leftNum: leftLineNum++, type: 'delete' });
                    rightLines.push({ type: 'empty', content: '', leftNum: null, rightNum: null });
                    break;
                    
                case 'insert':
                    leftLines.push({ type: 'empty', content: '', leftNum: null, rightNum: null });
                    rightLines.push({ ...lineInfo, rightNum: rightLineNum++, type: 'insert' });
                    break;
            }
        });
        
        return { leftLines, rightLines, changes };
    }
}

/**
 * Inline Formatter
 * Single Responsibility: Format diff for inline display
 */
class InlineFormatter extends DiffFormatter {
    format(diffResult) {
        const { changes } = diffResult;
        const lines = [];
        
        changes.forEach(change => {
            lines.push({
                type: change.type,
                content: change.content,
                lineNum: change.type === 'delete' ? change.originalLine + 1 : change.modifiedLine + 1
            });
        });
        
        return { lines, changes };
    }
}

/**
 * Unified Formatter (Git-style)
 * Single Responsibility: Format diff in unified format
 */
class UnifiedFormatter extends DiffFormatter {
    format(diffResult) {
        const { changes } = diffResult;
        const lines = [];
        
        changes.forEach(change => {
            let prefix = ' ';
            if (change.type === 'delete') prefix = '-';
            if (change.type === 'insert') prefix = '+';
            
            lines.push({
                prefix,
                content: change.content,
                type: change.type
            });
        });
        
        return { lines, changes };
    }
}

// ============================================================================
// STATISTICS CALCULATOR (Interface Segregation Principle)
// ============================================================================

/**
 * Diff Statistics Calculator
 * Single Responsibility: Calculate diff statistics
 */
class DiffStatisticsCalculator {
    calculate(diffResult) {
        const { changes, original, modified } = diffResult;
        
        let added = 0;
        let removed = 0;
        let modifiedCount = 0;
        let unchanged = 0;
        
        changes.forEach(change => {
            switch (change.type) {
                case 'insert':
                    added++;
                    break;
                case 'delete':
                    removed++;
                    break;
                case 'equal':
                    unchanged++;
                    break;
            }
        });
        
        // Calculate similarity percentage
        const totalLines = Math.max(original.length, modified.length);
        const similarity = totalLines > 0 ? (unchanged / totalLines * 100).toFixed(1) : 0;
        
        // Character-level stats
        const originalChars = original.join('\n').length;
        const modifiedChars = modified.join('\n').length;
        const charDiff = modifiedChars - originalChars;
        
        return {
            linesAdded: added,
            linesRemoved: removed,
            linesModified: modifiedCount,
            linesUnchanged: unchanged,
            totalLines: totalLines,
            similarity: parseFloat(similarity),
            originalChars,
            modifiedChars,
            charDiff
        };
    }
}

// ============================================================================
// JSON DIFF ENGINE (Single Responsibility Principle)
// ============================================================================

/**
 * JSON Diff Engine
 * Single Responsibility: Compare JSON objects with structure awareness
 */
class JsonDiffEngine {
    compare(originalObj, modifiedObj) {
        const changes = [];
        this.compareObjects(originalObj, modifiedObj, '', changes);
        return { changes, original: originalObj, modified: modifiedObj };
    }
    
    compareObjects(original, modified, path, changes) {
        const originalKeys = original ? Object.keys(original) : [];
        const modifiedKeys = modified ? Object.keys(modified) : [];
        const allKeys = new Set([...originalKeys, ...modifiedKeys]);
        
        allKeys.forEach(key => {
            const currentPath = path ? `${path}.${key}` : key;
            const originalValue = original ? original[key] : undefined;
            const modifiedValue = modified ? modified[key] : undefined;
            
            if (originalValue === undefined && modifiedValue !== undefined) {
                // Added
                changes.push({
                    type: 'added',
                    path: currentPath,
                    value: modifiedValue,
                    oldValue: undefined
                });
            } else if (originalValue !== undefined && modifiedValue === undefined) {
                // Removed
                changes.push({
                    type: 'removed',
                    path: currentPath,
                    value: undefined,
                    oldValue: originalValue
                });
            } else if (originalValue !== modifiedValue) {
                // Check if both are objects
                if (this.isObject(originalValue) && this.isObject(modifiedValue)) {
                    // Recursively compare nested objects
                    this.compareObjects(originalValue, modifiedValue, currentPath, changes);
                } else {
                    // Modified
                    changes.push({
                        type: 'modified',
                        path: currentPath,
                        value: modifiedValue,
                        oldValue: originalValue
                    });
                }
            } else {
                // Unchanged
                changes.push({
                    type: 'unchanged',
                    path: currentPath,
                    value: originalValue,
                    oldValue: originalValue
                });
            }
        });
    }
    
    isObject(value) {
        return value !== null && typeof value === 'object' && !Array.isArray(value);
    }
}

// ============================================================================
// MAIN DIFF SERVICE (Dependency Inversion Principle)
// ============================================================================

/**
 * Diff Viewer Service
 * Single Responsibility: Orchestrate diff operations
 * Follows Dependency Inversion - depends on abstractions
 */
class DiffViewerService {
    constructor(strategy = null, formatter = null) {
        this.strategy = strategy || new MyersDiffStrategy();
        this.formatter = formatter || new SideBySideFormatter();
        this.statisticsCalculator = new DiffStatisticsCalculator();
        this.jsonDiffEngine = new JsonDiffEngine();
    }
    
    /**
     * Set diff strategy
     */
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    
    /**
     * Set diff formatter
     */
    setFormatter(formatter) {
        this.formatter = formatter;
    }
    
    /**
     * Compare text
     */
    compareText(originalText, modifiedText, options = {}) {
        let original = originalText.split('\n');
        let modified = modifiedText.split('\n');
        
        // Apply options
        if (options.ignoreWhitespace) {
            original = original.map(line => line.trim());
            modified = modified.map(line => line.trim());
        }
        
        if (options.ignoreCase) {
            original = original.map(line => line.toLowerCase());
            modified = modified.map(line => line.toLowerCase());
        }
        
        // Use word diff if requested
        if (options.wordDiff) {
            this.setStrategy(new WordDiffStrategy());
        } else {
            this.setStrategy(new MyersDiffStrategy());
        }
        
        // Compute diff
        const diffResult = this.strategy.execute(original, modified);
        
        // Format result
        const formatted = this.formatter.format(diffResult, options);
        
        // Calculate statistics
        const statistics = this.statisticsCalculator.calculate(diffResult);
        
        return {
            formatted,
            statistics,
            raw: diffResult
        };
    }
    
    /**
     * Compare JSON
     */
    compareJson(originalJson, modifiedJson) {
        let originalObj, modifiedObj;
        
        try {
            originalObj = typeof originalJson === 'string' ? JSON.parse(originalJson) : originalJson;
            modifiedObj = typeof modifiedJson === 'string' ? JSON.parse(modifiedJson) : modifiedJson;
        } catch (error) {
            throw new Error('Invalid JSON: ' + error.message);
        }
        
        const diffResult = this.jsonDiffEngine.compare(originalObj, modifiedObj);
        
        // Calculate statistics
        const stats = {
            added: diffResult.changes.filter(c => c.type === 'added').length,
            removed: diffResult.changes.filter(c => c.type === 'removed').length,
            modified: diffResult.changes.filter(c => c.type === 'modified').length,
            unchanged: diffResult.changes.filter(c => c.type === 'unchanged').length
        };
        
        return {
            changes: diffResult.changes,
            statistics: stats,
            original: originalObj,
            modified: modifiedObj
        };
    }
}

// ============================================================================
// EXPORTS
// ============================================================================

// Export for use in tool module
if (typeof window !== 'undefined') {
    window.DiffEngine = {
        DiffViewerService,
        MyersDiffStrategy,
        LineDiffStrategy,
        WordDiffStrategy,
        SideBySideFormatter,
        InlineFormatter,
        UnifiedFormatter,
        DiffStatisticsCalculator,
        JsonDiffEngine
    };
}
