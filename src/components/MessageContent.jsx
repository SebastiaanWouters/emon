import React from 'react'
import reactStringReplace from 'react-string-replace'

export const MessageContent = ({msg}) => {

    const linkRegex = /(https?:\/\/\S+)/g
    const lnRegex =
      /(lightning:[\w.-]+@[\w.-]+|lightning:\w+\?amount=\d+|(?:lightning:)?(?:lnurl|lnbc|lntb)[\da-z0-9]+)/gi;

    function replaceLinks(msg) {
        return (reactStringReplace(msg, linkRegex, (match, i) => (
            <a key={match + i} href={match} target="_blank">
              {match.length > 20 ? `${match.slice(0,20)}...` : match}
            </a>
          )))
    }
    function replaceInvoice(msg) {
        return reactStringReplace(msg, lnRegex, (match, i) => {
            if (!match.startsWith('lightning:')) {
              match = `lightning:${match}`;
            }
            return (<>
                    <a className='lightning' key={match + i} href={match}>⚡ Pay with lightning</a>
                    </>)
          });
    }
    function replaceAll(msg) {
        const replacedLinks = replaceLinks(msg);
        const replacedInvoices = replaceInvoice(replacedLinks);
        return replacedInvoices;
    }

    return (
        replaceAll(msg)
    )
}
